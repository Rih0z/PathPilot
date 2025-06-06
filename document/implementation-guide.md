# PathPilot 実装ガイド

## 1. プロジェクト構造

### 1.1 推奨ディレクトリ構造
```
pathpilot/
├── apps/
│   ├── web/                 # React Frontend (Cloudflare Pages)
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── hooks/
│   │   │   ├── stores/
│   │   │   ├── utils/
│   │   │   └── types/
│   │   ├── public/
│   │   └── package.json
│   └── api/                 # Cloudflare Workers API
│       ├── src/
│       │   ├── handlers/
│       │   ├── services/
│       │   ├── utils/
│       │   ├── types/
│       │   └── index.ts
│       ├── wrangler.toml
│       └── package.json
├── packages/
│   ├── shared/              # 共通型定義・ユーティリティ
│   │   ├── src/
│   │   │   ├── types/
│   │   │   ├── utils/
│   │   │   └── constants/
│   │   └── package.json
│   └── database/            # Supabase設定・マイグレーション
│       ├── migrations/
│       ├── seed/
│       └── supabase.config.ts
├── tools/
│   ├── deploy/              # デプロイメントスクリプト
│   ├── scripts/             # 開発・運用スクリプト
│   └── monitoring/          # 監視・ログ設定
├── document/                # システム設計・ドキュメント
│   └── message/             # 多言語メッセージ
└── package.json             # Monorepo設定
```

### 1.2 技術スタック詳細
```json
{
  "frontend": {
    "framework": "React 18 + TypeScript",
    "styling": "Tailwind CSS + HeadlessUI",
    "state": "Zustand + React Query",
    "routing": "React Router v6",
    "build": "Vite",
    "deployment": "Cloudflare Pages"
  },
  "backend": {
    "runtime": "Cloudflare Workers",
    "language": "TypeScript",
    "framework": "Hono.js",
    "storage": "Cloudflare KV + Durable Objects",
    "database": "Supabase PostgreSQL",
    "files": "Cloudflare R2"
  },
  "development": {
    "monorepo": "pnpm workspaces",
    "testing": "Vitest + Playwright",
    "linting": "ESLint + Prettier",
    "ci_cd": "GitHub Actions",
    "monitoring": "Cloudflare Analytics + Sentry"
  }
}
```

## 2. 段階的実装計画

### 2.1 Phase 1: 基盤構築 (Week 1-4)

#### Week 1: 開発環境セットアップ
```bash
# プロジェクト初期化
mkdir pathpilot && cd pathpilot
npm init -y
pnpm init

# Monorepo設定
cat > package.json << 'EOF'
{
  "name": "pathpilot",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev": "pnpm run -r dev",
    "build": "pnpm run -r build",
    "test": "pnpm run -r test",
    "deploy": "pnpm run -r deploy",
    "type-check": "pnpm run -r type-check"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0",
    "prettier": "^3.0.0",
    "eslint": "^8.0.0"
  }
}
EOF

# 共通設定ファイル
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": {
      "@pathpilot/shared/*": ["packages/shared/src/*"],
      "@pathpilot/database/*": ["packages/database/src/*"]
    }
  }
}
EOF
```

#### Week 2: Cloudflare Workers API基盤
```typescript
// apps/api/src/index.ts
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { promptsRouter } from './handlers/prompts';
import { usersRouter } from './handlers/users';
import { extractionsRouter } from './handlers/extractions';

export interface Env {
  // Cloudflare bindings
  PROMPT_CACHE: KVNamespace;
  SESSION_STORE: KVNamespace;
  LEARNING_CACHE: KVNamespace;
  USER_CONTEXT: DurableObjectNamespace;
  STORAGE: R2Bucket;
  
  // Environment variables
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  ENCRYPTION_KEY: string;
  FIREBASE_PROJECT_ID: string;
}

const app = new Hono<{ Bindings: Env }>();

// Middleware
app.use('*', cors());
app.use('*', logger());

// Routes
app.route('/api/prompts', promptsRouter);
app.route('/api/users', usersRouter);
app.route('/api/extractions', extractionsRouter);

// Health check
app.get('/health', (c) => c.json({ status: 'ok', timestamp: Date.now() }));

export default app;
```

```typescript
// apps/api/src/handlers/prompts.ts
import { Hono } from 'hono';
import { PromptOrchestrationEngine } from '../services/prompt-orchestration';
import { UserContextManager } from '../services/user-context';
import { validateAuth } from '../middleware/auth';

export const promptsRouter = new Hono<{ Bindings: Env }>();

promptsRouter.use('*', validateAuth);

promptsRouter.get('/recommend', async (c) => {
  const { userId } = c.get('user');
  const { objective, urgency } = c.req.query();
  
  const contextManager = new UserContextManager(c.env);
  const orchestrator = new PromptOrchestrationEngine(c.env);
  
  const userContext = await contextManager.getContext(userId);
  const recommendations = await orchestrator.getRecommendations(
    userContext,
    { objective, urgency }
  );
  
  return c.json(recommendations);
});

promptsRouter.post('/generate', async (c) => {
  const { userId } = c.get('user');
  const { templateId, objective, targetContext } = await c.req.json();
  
  const orchestrator = new PromptOrchestrationEngine(c.env);
  const prompt = await orchestrator.generatePersonalizedPrompt(
    userId,
    templateId,
    objective,
    targetContext
  );
  
  return c.json(prompt);
});
```

#### Week 3: React Frontend基盤
```typescript
// apps/web/src/App.tsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './providers/AuthProvider';
import { Router } from './components/Router';
import { Toaster } from './components/ui/Toaster';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Router />
          <Toaster />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
```

```typescript
// apps/web/src/components/Router.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Layout } from './Layout';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { PromptsPage } from '../pages/PromptsPage';
import { ApplicationsPage } from '../pages/ApplicationsPage';
import { SettingsPage } from '../pages/SettingsPage';

export function Router() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/prompts" element={<PromptsPage />} />
        <Route path="/applications" element={<ApplicationsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
```

#### Week 4: データベース・認証設定
```sql
-- packages/database/migrations/001_initial.sql
-- (前述のスキーマ設計を実装)
```

```typescript
// packages/database/src/client.ts
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

export function createSupabaseClient(url: string, key: string) {
  return createClient<Database>(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
    realtime: {
      params: {
        eventsPerSecond: 10,
      },
    },
  });
}
```

### 2.2 Phase 2: コア機能実装 (Week 5-8)

#### Week 5-6: プロンプトオーケストレーション
```typescript
// apps/api/src/services/prompt-orchestration.ts
export class PromptOrchestrationEngine {
  constructor(private env: Env) {}

  async generatePersonalizedPrompt(
    userId: string,
    templateId: string,
    objective: string,
    targetContext?: TargetContext
  ): Promise<PersonalizedPrompt> {
    
    // 1. ユーザーコンテキスト取得
    const contextManager = new UserContextManager(this.env);
    const userContext = await contextManager.getContextForPrompt(userId, objective);
    
    // 2. テンプレート取得・選択
    const template = await this.getTemplate(templateId);
    const optimizedTemplate = await this.optimizeTemplate(template, userContext);
    
    // 3. パーソナライゼーション
    const personalizedPrompt = await this.personalizePrompt(
      optimizedTemplate,
      userContext,
      targetContext
    );
    
    // 4. 学習データ記録
    await this.recordGeneration(userId, templateId, personalizedPrompt);
    
    return personalizedPrompt;
  }

  private async personalizePrompt(
    template: PromptTemplate,
    userContext: UserContext,
    targetContext?: TargetContext
  ): Promise<PersonalizedPrompt> {
    
    const variables = {
      // 基本情報
      userName: userContext.profile.fullName || 'あなた',
      currentRole: userContext.profile.currentRole,
      experience: this.formatExperience(userContext.profile.experience, targetContext),
      skills: this.prioritizeSkills(userContext.profile.skills, targetContext),
      
      // 感情・心理状態
      confidenceLevel: this.assessConfidenceLevel(userContext),
      stressLevel: userContext.currentState.stressLevel,
      motivationBooster: this.generateMotivationBooster(userContext),
      
      // 目標・願望
      primaryGoal: userContext.goals.primaryGoal,
      avoidanceFactors: userContext.goals.avoidanceFactors?.join(', ') || '',
      
      // ターゲット情報
      targetCompany: targetContext?.companyName || '',
      targetRole: targetContext?.role || '',
      industryContext: targetContext?.industry || ''
    };

    const renderedPrompt = this.renderTemplate(template.template, variables);
    
    return {
      promptText: renderedPrompt,
      metadata: {
        templateId: template.id,
        personalizationLevel: this.calculatePersonalizationLevel(variables),
        expectedEffectiveness: await this.predictEffectiveness(renderedPrompt, userContext),
        usageInstructions: this.generateUsageInstructions(template, userContext),
        followUpActions: this.generateFollowUpActions(userContext, template)
      }
    };
  }
}
```

#### Week 7-8: ユーザーコンテキスト管理
```typescript
// apps/api/src/services/user-context.ts
export class UserContextManager {
  constructor(private env: Env) {}

  async updateContext(userId: string, contextUpdate: ContextUpdate): Promise<UserContext> {
    // Durable Objectを使用したリアルタイム状態管理
    const contextObject = this.env.USER_CONTEXT.get(
      this.env.USER_CONTEXT.idFromString(userId)
    );
    
    const response = await contextObject.fetch('/', {
      method: 'POST',
      body: JSON.stringify(contextUpdate)
    });
    
    return await response.json();
  }

  async getContextForPrompt(userId: string, objective: string): Promise<ContextualData> {
    const userContext = await this.getContext(userId);
    const relevantHistory = await this.getRelevantHistory(userId, objective);
    const emotionalState = await this.analyzeEmotionalState(userContext);
    
    return {
      userContext,
      relevantHistory,
      emotionalState,
      contextHash: this.generateContextHash(userContext, objective),
      timestamp: Date.now()
    };
  }

  private async analyzeEmotionalState(userContext: UserContext): Promise<EmotionalState> {
    const indicators = {
      recentRejections: userContext.currentState.recentRejections || 0,
      timeToDeadline: userContext.currentState.timeToDeadline || Infinity,
      confidenceLevel: userContext.currentState.confidenceLevel || 0.5,
      supportSystem: userContext.currentState.supportSystem || 'medium'
    };

    const stressLevel = this.calculateStressLevel(indicators);
    const motivationLevel = this.calculateMotivationLevel(indicators);
    const supportNeeds = this.identifySupportNeeds(indicators);

    return {
      stressLevel,
      motivationLevel,
      supportNeeds,
      confidenceLevel: indicators.confidenceLevel,
      recommendedTone: this.recommendTone(stressLevel, motivationLevel)
    };
  }
}
```

### 2.3 Phase 3: UI/UX実装 (Week 9-12)

#### Week 9-10: プロンプト生成UI
```typescript
// apps/web/src/pages/PromptsPage.tsx
import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { PromptRecommendations } from '../components/PromptRecommendations';
import { PromptGenerator } from '../components/PromptGenerator';
import { PromptHistory } from '../components/PromptHistory';
import { usePrompts } from '../hooks/usePrompts';

export function PromptsPage() {
  const [selectedObjective, setSelectedObjective] = useState<string>('');
  const [targetContext, setTargetContext] = useState<TargetContext | null>(null);

  const { 
    recommendations, 
    generatePrompt, 
    isGenerating 
  } = usePrompts();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          プロンプト生成
        </h1>
        
        {/* 現在の状況表示 */}
        <CurrentContextDisplay />
        
        {/* 推奨プロンプト */}
        <PromptRecommendations 
          recommendations={recommendations}
          onSelect={(template) => setSelectedObjective(template.id)}
        />
        
        {/* プロンプト生成フォーム */}
        <PromptGenerator
          objective={selectedObjective}
          targetContext={targetContext}
          onTargetContextChange={setTargetContext}
          onGenerate={generatePrompt}
          isGenerating={isGenerating}
        />
      </div>

      {/* 履歴 */}
      <PromptHistory />
    </div>
  );
}
```

```typescript
// apps/web/src/components/PromptGenerator.tsx
import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { CopyButton } from './ui/CopyButton';
import { useMessages } from '../hooks/useMessages';

interface PromptGeneratorProps {
  objective: string;
  targetContext: TargetContext | null;
  onTargetContextChange: (context: TargetContext | null) => void;
  onGenerate: (params: GeneratePromptParams) => Promise<PersonalizedPrompt>;
  isGenerating: boolean;
}

export function PromptGenerator({
  objective,
  targetContext,
  onTargetContextChange,
  onGenerate,
  isGenerating
}: PromptGeneratorProps) {
  const [generatedPrompt, setGeneratedPrompt] = useState<PersonalizedPrompt | null>(null);
  const { t } = useMessages();

  const handleGenerate = async () => {
    try {
      const prompt = await onGenerate({
        objective,
        targetContext: targetContext || undefined
      });
      setGeneratedPrompt(prompt);
    } catch (error) {
      console.error('Failed to generate prompt:', error);
    }
  };

  return (
    <div className="space-y-4">
      {/* ターゲット情報入力 */}
      {objective && (
        <Card className="p-4">
          <h3 className="text-lg font-medium mb-3">
            {t('prompts.targetInfo')}
          </h3>
          <TargetContextForm
            context={targetContext}
            onChange={onTargetContextChange}
          />
        </Card>
      )}

      {/* 生成ボタン */}
      <Button
        onClick={handleGenerate}
        disabled={!objective || isGenerating}
        size="lg"
        className="w-full"
      >
        {isGenerating ? t('common.generating') : t('prompts.generate')}
      </Button>

      {/* 生成されたプロンプト */}
      {generatedPrompt && (
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-medium">
              {t('prompts.generated')}
            </h3>
            <CopyButton 
              text={generatedPrompt.promptText}
              label={t('prompts.copy')}
            />
          </div>
          
          <div className="bg-gray-50 rounded-md p-4 mb-4">
            <pre className="whitespace-pre-wrap text-sm">
              {generatedPrompt.promptText}
            </pre>
          </div>

          {/* 使用方法 */}
          <UsageInstructions 
            instructions={generatedPrompt.metadata.usageInstructions}
          />

          {/* フォローアップアクション */}
          <FollowUpActions 
            actions={generatedPrompt.metadata.followUpActions}
          />
        </Card>
      )}
    </div>
  );
}
```

#### Week 11-12: ダッシュボード・分析画面
```typescript
// apps/web/src/pages/DashboardPage.tsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { StatsCards } from '../components/StatsCards';
import { TodayActions } from '../components/TodayActions';
import { ProgressChart } from '../components/ProgressChart';
import { RecentActivity } from '../components/RecentActivity';
import { useDashboard } from '../hooks/useDashboard';

export function DashboardPage() {
  const { 
    stats, 
    todayActions, 
    progressData, 
    recentActivity, 
    isLoading 
  } = useDashboard();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* 統計カード */}
      <StatsCards stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 今日のアクション */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">今日のアクション</h2>
          <TodayActions actions={todayActions} />
        </div>

        {/* 進捗チャート */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">進捗状況</h2>
          <ProgressChart data={progressData} />
        </div>
      </div>

      {/* 最近のアクティビティ */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold mb-4">最近のアクティビティ</h2>
        <RecentActivity activities={recentActivity} />
      </div>
      
      {/* 使用分析（Phase 1から表示） */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold mb-4">使用状況分析</h2>
        <UsageAnalytics usageStats={usageStats} />
      </div>
    </div>
  );
}
```

## 3. 多言語対応実装

### 3.1 メッセージシステム
```typescript
// packages/shared/src/i18n/index.ts
export interface Messages {
  common: {
    loading: string;
    error: string;
    success: string;
    cancel: string;
    save: string;
    generating: string;
  };
  prompts: {
    generate: string;
    copy: string;
    generated: string;
    targetInfo: string;
    usageInstructions: string;
    followUp: string;
  };
  dashboard: {
    todayActions: string;
    progress: string;
    recentActivity: string;
    stats: {
      applications: string;
      interviews: string;
      offers: string;
      successRate: string;
    };
  };
  applications: {
    add: string;
    edit: string;
    delete: string;
    status: {
      research: string;
      applied: string;
      interview: string;
      offer: string;
      rejected: string;
    };
  };
}

export type SupportedLanguage = 'ja' | 'en' | 'ko' | 'zh';
export type MessageKey = keyof Messages;
```

### 3.2 言語別メッセージファイル
```typescript
// document/message/ja.ts
export const jaMessages: Messages = {
  common: {
    loading: '読み込み中...',
    error: 'エラーが発生しました',
    success: '成功しました',
    cancel: 'キャンセル',
    save: '保存',
    generating: '生成中...'
  },
  prompts: {
    generate: 'プロンプトを生成',
    copy: 'コピー',
    generated: '生成されたプロンプト',
    targetInfo: 'ターゲット情報',
    usageInstructions: '使用方法',
    followUp: 'フォローアップアクション'
  },
  dashboard: {
    todayActions: '今日のアクション',
    progress: '進捗状況',
    recentActivity: '最近のアクティビティ',
    stats: {
      applications: '応募数',
      interviews: '面接数',
      offers: '内定数',
      successRate: '成功率'
    }
  },
  applications: {
    add: '応募を追加',
    edit: '編集',
    delete: '削除',
    status: {
      research: '企業研究',
      applied: '応募済み',
      interview: '面接',
      offer: '内定',
      rejected: '不採用'
    }
  }
};
```

```typescript
// document/message/en.ts
export const enMessages: Messages = {
  common: {
    loading: 'Loading...',
    error: 'An error occurred',
    success: 'Success',
    cancel: 'Cancel',
    save: 'Save',
    generating: 'Generating...'
  },
  prompts: {
    generate: 'Generate Prompt',
    copy: 'Copy',
    generated: 'Generated Prompt',
    targetInfo: 'Target Information',
    usageInstructions: 'Usage Instructions',
    followUp: 'Follow-up Actions'
  },
  dashboard: {
    todayActions: "Today's Actions",
    progress: 'Progress',
    recentActivity: 'Recent Activity',
    stats: {
      applications: 'Applications',
      interviews: 'Interviews',
      offers: 'Offers',
      successRate: 'Success Rate'
    }
  },
  applications: {
    add: 'Add Application',
    edit: 'Edit',
    delete: 'Delete',
    status: {
      research: 'Research',
      applied: 'Applied',
      interview: 'Interview',
      offer: 'Offer',
      rejected: 'Rejected'
    }
  }
};
```

### 3.3 多言語フック
```typescript
// apps/web/src/hooks/useMessages.ts
import { useContext } from 'react';
import { LanguageContext } from '../providers/LanguageProvider';
import { Messages, SupportedLanguage } from '@pathpilot/shared/i18n';
import { jaMessages } from '../../../document/message/ja';
import { enMessages } from '../../../document/message/en';

const messageMap: Record<SupportedLanguage, Messages> = {
  ja: jaMessages,
  en: enMessages,
  ko: jaMessages, // Fallback to Japanese for now
  zh: jaMessages  // Fallback to Japanese for now
};

export function useMessages() {
  const { language } = useContext(LanguageContext);
  const messages = messageMap[language] || messageMap.ja;

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = messages;
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return { t, language, messages };
}
```

## 4. Claude Code運用コマンド

### 4.1 開発・デプロイコマンド
```json
// package.json scripts
{
  "scripts": {
    "dev": "concurrently \"pnpm run dev:api\" \"pnpm run dev:web\"",
    "dev:api": "cd apps/api && wrangler dev",
    "dev:web": "cd apps/web && vite dev",
    
    "build": "pnpm run build:api && pnpm run build:web",
    "build:api": "cd apps/api && wrangler publish --dry-run",
    "build:web": "cd apps/web && vite build",
    
    "deploy": "pnpm run deploy:api && pnpm run deploy:web",
    "deploy:api": "cd apps/api && wrangler publish",
    "deploy:web": "cd apps/web && wrangler pages publish dist",
    
    "test": "pnpm run test:unit && pnpm run test:e2e",
    "test:unit": "vitest run",
    "test:e2e": "playwright test",
    
    "db:migrate": "cd packages/database && supabase db push",
    "db:seed": "cd packages/database && supabase db seed",
    "db:reset": "cd packages/database && supabase db reset",
    
    "logs": "cd apps/api && wrangler tail",
    "logs:web": "wrangler pages deployment list",
    
    "type-check": "pnpm run -r type-check"
  }
}
```

### 4.2 Claude Code専用タスク
```bash
#!/bin/bash
# tools/scripts/claude-deploy.sh

echo "🚀 PathPilot Claude Code Deployment"

# 環境確認
if [ "$1" = "production" ]; then
  ENV="production"
  echo "📦 Deploying to PRODUCTION"
elif [ "$1" = "staging" ]; then
  ENV="staging"
  echo "📦 Deploying to STAGING"
else
  echo "❌ Please specify environment: production or staging"
  exit 1
fi

# タイプチェック
echo "🔍 Running type checks..."
pnpm run type-check
if [ $? -ne 0 ]; then
  echo "❌ Type check failed"
  exit 1
fi

# テスト実行
echo "🧪 Running tests..."
pnpm run test:unit
if [ $? -ne 0 ]; then
  echo "❌ Tests failed"
  exit 1
fi

# ビルド
echo "🏗️ Building..."
pnpm run build
if [ $? -ne 0 ]; then
  echo "❌ Build failed"
  exit 1
fi

# デプロイ
echo "🚢 Deploying to $ENV..."
if [ "$ENV" = "production" ]; then
  cd apps/api && wrangler publish --env production
  cd ../web && wrangler pages publish dist --project-name pathpilot-web
else
  cd apps/api && wrangler publish --env staging
  cd ../web && wrangler pages publish dist --project-name pathpilot-web-staging
fi

echo "✅ Deployment completed!"
echo "🌐 Visit: https://pathpilot.app"
```

### 4.3 運用監視スクリプト
```bash
#!/bin/bash
# tools/scripts/monitor.sh

echo "📊 PathPilot System Monitoring"

# API健全性チェック
echo "🔍 Checking API health..."
API_HEALTH=$(curl -s https://api.pathpilot.app/health | jq -r '.status')
if [ "$API_HEALTH" = "ok" ]; then
  echo "✅ API is healthy"
else
  echo "❌ API health check failed"
fi

# パフォーマンス確認
echo "⚡ Checking performance..."
wrangler tail --format=json | jq '.outcome,.duration_ms' | head -10

# エラーログ確認
echo "🐛 Recent errors..."
wrangler tail --format=json | jq 'select(.outcome=="exception")' | tail -5

# ストレージ使用量
echo "💾 Storage usage..."
wrangler kv:namespace list | jq '.[].title'
wrangler r2 bucket list

echo "📈 Full analytics: https://dash.cloudflare.com"
```

この実装ガイドにより、PathPilotを段階的に構築し、Claude Codeから効率的に運用できるシステムを実現できます。