# PathPilot 技術仕様書

## 1. システム概要

### 1.1 アーキテクチャ概要
- **システム構成**: フルスタックWebアプリケーション
- **開発方針**: MVPファースト、段階的機能拡張
- **外部依存**: 決済・認証のみ外部API、AIは顧客所有

### 1.2 技術スタック
```javascript
const TechStack = {
  frontend: "React 18 + TypeScript + Tailwind CSS",
  backend: "Node.js + Express + TypeScript",
  database: "PostgreSQL + Prisma ORM",
  authentication: "Firebase Auth",
  payment: "Stripe",
  deployment: "Vercel (Frontend) + Railway (Backend)",
  monitoring: "Sentry + Google Analytics"
}
```

## 2. 機能仕様

### 2.1 コア機能

#### 機能1: プロンプトライブラリ管理
- **概要**: 就活特化プロンプトの分類・提供システム
- **入力**: カテゴリ選択、ユーザープロフィール
- **処理**: プロンプトテンプレートのパーソナライズ
- **出力**: カスタマイズされたプロンプト文
- **実装方針**: 動的テンプレート生成とコピー機能

```javascript
// プロンプト生成システム
const generatePrompt = (template, userProfile, jobInfo) => {
  const prompt = template
    .replace('{{experience}}', userProfile.experience)
    .replace('{{skills}}', userProfile.skills.join(', '))
    .replace('{{company}}', jobInfo.companyName)
    .replace('{{position}}', jobInfo.position);
  
  return {
    content: prompt,
    category: template.category,
    usage: template.usage_instructions
  };
};
```

#### 機能2: 企業・応募進捗管理
- **概要**: 複数企業への応募状況をトラッキング
- **入力**: 企業情報、応募状況、AI分析結果
- **処理**: ステータス更新、優先度算出、次アクション提案
- **出力**: ダッシュボード、進捗レポート
- **実装方針**: ステートマシンベースの進捗管理

```javascript
// 進捗管理システム
const ApplicationStages = {
  RESEARCH: 'research',
  APPLIED: 'applied',
  DOCUMENT_REVIEW: 'document_review',
  INTERVIEW_1: 'interview_1',
  INTERVIEW_FINAL: 'interview_final',
  OFFER: 'offer',
  REJECTED: 'rejected'
};

const updateApplicationStatus = (applicationId, newStatus, notes) => {
  return prisma.application.update({
    where: { id: applicationId },
    data: {
      status: newStatus,
      lastUpdated: new Date(),
      notes: notes,
      nextAction: calculateNextAction(newStatus)
    }
  });
};
```

#### 機能3: AIパイロット・ナビゲーション
- **概要**: ユーザーの就活状況に基づく最適アクション提案
- **入力**: 応募状況、企業分析結果、ユーザー目標
- **処理**: 優先度算出、スケジューリング、リコメンデーション
- **出力**: 今日のアクション、週次目標、戦略提案
- **実装方針**: ルールベースエンジン + 機械学習アルゴリズム

```javascript
// パイロットナビゲーションシステム
const generateDailyActions = (userId) => {
  const applications = getUserApplications(userId);
  const userGoals = getUserGoals(userId);
  
  const actions = [];
  
  // 緊急度の高いアクション
  applications.forEach(app => {
    if (app.status === 'interview_1' && app.interviewDate) {
      actions.push({
        type: 'interview_prep',
        priority: 'high',
        description: `${app.company}の面接対策（${app.interviewDate}）`,
        estimatedTime: 120
      });
    }
  });
  
  return prioritizeActions(actions, userGoals);
};
```

### 2.2 UI/UX仕様

#### 画面構成
```
PathPilotアプリ
├── 認証画面
│   ├── 状態管理: Firebase Auth Context
│   └── 機能: ログイン/登録/パスワードリセット
├── ダッシュボード
│   ├── 状態管理: Zustand Store
│   └── 機能: 進捗概要、今日のアクション、統計表示
├── プロンプトライブラリ
│   ├── 状態管理: React Query Cache
│   └── 機能: カテゴリ別検索、プロンプト生成、コピー
├── 企業管理
│   ├── 状態管理: Zustand Store
│   └── 機能: 企業追加、進捗更新、分析結果入力
├── 設定・プロフィール
│   ├── 状態管理: React Hook Form
│   └── 機能: プロフィール編集、サブスクリプション管理
└── ナビゲーション: React Router v6
```

## 3. データ設計

### 3.1 データモデル
```javascript
// Prismaスキーマ設計
const DataModel = {
  User: {
    id: "string",
    email: "string",
    profile: "UserProfile",
    subscription: "Subscription",
    applications: "Application[]",
    createdAt: "DateTime",
    updatedAt: "DateTime"
  },
  
  UserProfile: {
    id: "string",
    userId: "string",
    fullName: "string",
    currentPosition: "string",
    experience: "string[]",
    skills: "string[]",
    targetRole: "string",
    targetSalary: "number",
    preferredLocation: "string[]"
  },
  
  Application: {
    id: "string",
    userId: "string",
    companyName: "string",
    position: "string",
    salaryRange: "string",
    status: "ApplicationStatus",
    appliedDate: "DateTime",
    nextAction: "string",
    notes: "string",
    aiAnalysis: "AIAnalysisResult[]"
  },
  
  PromptTemplate: {
    id: "string",
    category: "PromptCategory",
    title: "string",
    template: "string",
    variables: "string[]",
    instructions: "string",
    subscriptionTier: "SubscriptionTier"
  },
  
  AIAnalysisResult: {
    id: "string",
    applicationId: "string",
    analysisType: "string", // 'resume', 'company_research', 'interview_prep'
    inputData: "string",
    result: "string",
    confidence: "number",
    createdAt: "DateTime"
  }
}
```

### 3.2 ストレージ設計
- **データベース**: PostgreSQL（構造化データ）
- **ファイルストレージ**: AWS S3（プロンプトテンプレート、ドキュメント）
- **キャッシュ**: Redis（セッション、よく使われるプロンプト）
- **バックアップ**: 日次自動バックアップ（7日間保持）

## 4. API設計

### 4.1 RESTful API エンドポイント
```javascript
// メイン API エンドポイント
const APIEndpoints = {
  // 認証
  'POST /auth/login': 'ログイン',
  'POST /auth/register': 'ユーザー登録',
  'POST /auth/logout': 'ログアウト',
  
  // プロンプト管理
  'GET /prompts': 'プロンプトライブラリ取得',
  'POST /prompts/generate': 'カスタムプロンプト生成',
  'GET /prompts/categories': 'カテゴリ一覧',
  
  // 企業・応募管理
  'GET /applications': '応募一覧取得',
  'POST /applications': '新規応募追加',
  'PUT /applications/:id': '応募情報更新',
  'DELETE /applications/:id': '応募削除',
  'POST /applications/:id/analysis': 'AI分析結果追加',
  
  // ユーザー管理
  'GET /users/profile': 'プロフィール取得',
  'PUT /users/profile': 'プロフィール更新',
  'GET /users/dashboard': 'ダッシュボードデータ',
  
  // ナビゲーション
  'GET /navigation/daily-actions': '今日のアクション',
  'GET /navigation/recommendations': 'おすすめアクション',
  
  // サブスクリプション
  'GET /subscription/plans': 'プラン一覧',
  'POST /subscription/subscribe': 'プラン変更',
  'GET /subscription/status': 'サブスクリプション状況'
};

// API実装例
app.post('/prompts/generate', authenticateUser, async (req, res) => {
  try {
    const { templateId, userContext, jobContext } = req.body;
    const template = await getPromptTemplate(templateId);
    const generatedPrompt = generatePrompt(template, userContext, jobContext);
    
    // 使用ログ記録
    await logPromptUsage(req.user.id, templateId);
    
    res.json({
      success: true,
      prompt: generatedPrompt
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
```

### 4.2 エラーハンドリング
- **認証エラー**: 401 Unauthorized → ログイン画面へリダイレクト
- **権限エラー**: 403 Forbidden → サブスクリプション案内
- **データ不整合**: 422 Unprocessable Entity → フォームバリデーションエラー表示
- **サーバーエラー**: 500 Internal Server Error → エラーログ記録 + ユーザー通知

## 5. 特殊機能実装

### 5.1 プロンプトパーソナライゼーションエンジン
企画書で強調されている「職種特化プロンプト」の技術実装

#### 実装アプローチ
```javascript
// 動的プロンプト生成システム
class PromptPersonalizationEngine {
  constructor() {
    this.templateEngine = new TemplateEngine();
    this.contextAnalyzer = new ContextAnalyzer();
  }
  
  async generatePersonalizedPrompt(templateId, userProfile, targetJob) {
    // 1. ベーステンプレート取得
    const template = await this.getTemplate(templateId);
    
    // 2. コンテキスト分析
    const context = this.contextAnalyzer.analyze(userProfile, targetJob);
    
    // 3. 動的変数置換
    const variables = {
      experience: this.formatExperience(userProfile.experience, targetJob),
      skills: this.prioritizeSkills(userProfile.skills, targetJob.requirements),
      companyValues: await this.extractCompanyValues(targetJob.companyName),
      industryTrends: await this.getIndustryTrends(targetJob.industry)
    };
    
    // 4. プロンプト生成
    return this.templateEngine.render(template, variables, context);
  }
  
  formatExperience(userExp, targetJob) {
    // 経験を対象職種に関連付けて再フォーマット
    return userExp
      .filter(exp => this.isRelevant(exp, targetJob))
      .map(exp => this.enhanceDescription(exp, targetJob))
      .join('\n- ');
  }
}
```

### 5.2 インテリジェント進捗トラッキング
```javascript
// スマート進捗管理システム
class ProgressIntelligenceEngine {
  calculateSuccessProbability(application, userProfile) {
    const factors = {
      skillMatch: this.calculateSkillMatch(application, userProfile),
      experienceRelevance: this.calculateExperienceRelevance(application, userProfile),
      applicationTiming: this.calculateTimingScore(application),
      marketConditions: this.getMarketConditions(application.industry)
    };
    
    // 重み付き平均で成功確率算出
    const weights = { skillMatch: 0.4, experienceRelevance: 0.3, applicationTiming: 0.2, marketConditions: 0.1 };
    
    return Object.entries(factors).reduce((total, [key, value]) => {
      return total + (value * weights[key]);
    }, 0);
  }
  
  generateNextActions(applications, userGoals) {
    const urgentActions = this.getUrgentActions(applications);
    const strategicActions = this.getStrategicActions(applications, userGoals);
    const optimizationActions = this.getOptimizationActions(applications);
    
    return this.prioritizeActions([...urgentActions, ...strategicActions, ...optimizationActions]);
  }
}
```

### 5.3 パフォーマンス最適化
- **メモリ使用量**: React.memo、useMemoでコンポーネント最適化
- **処理速度**: React Query によるデータキャッシュ、仮想化リスト
- **ユーザー体験**: Suspense + Lazy loading、Skeleton Screen

## 6. 開発工程

### 6.1 Phase別実装

**Phase 1: MVP（3ヶ月）**
- [ ] 基盤インフラ構築（認証、DB、API基盤）
- [ ] ユーザー登録・プロフィール管理
- [ ] 基本プロンプトライブラリ（25種類）
- [ ] 企業管理機能（手動入力）
- [ ] シンプルなダッシュボード
- [ ] 基本的な進捗管理（6段階）
- [ ] Stripeサブスクリプション統合
- [ ] ベーシックプラン限定でローンチ

**Phase 2: 機能拡張（3ヶ月）**
- [ ] 高度なプロンプトライブラリ（70種類）
- [ ] パーソナライゼーションエンジン実装
- [ ] インテリジェント進捗トラッキング
- [ ] AI分析結果管理機能
- [ ] 内定確率予測システム
- [ ] 高度なダッシュボード・分析画面
- [ ] スタンダード・プレミアムプラン展開
- [ ] モバイル対応強化

**Phase 3: 高度機能（6ヶ月）**
- [ ] 機械学習ベースの推奨システム
- [ ] 企業情報自動収集システム
- [ ] リアルタイム市場分析
- [ ] チーム・企業向け機能
- [ ] API提供開始
- [ ] 多言語対応（英語）

### 6.2 技術的課題と対策

| 課題 | 影響度 | 対策 |
|------|-------|-----|
| **大量プロンプトの管理** | 高 | 階層化ストレージ + 効率的検索システム |
| **ユーザー離脱率** | 高 | オンボーディング最適化 + 段階的価値提供 |
| **パーソナライゼーション精度** | 中 | A/Bテスト + ユーザーフィードバック収集 |
| **スケーラビリティ** | 中 | 水平スケーリング対応設計 + CDN活用 |

## 7. テスト仕様

### 7.1 テスト戦略
- **ユニットテスト**: Jest + React Testing Library（コンポーネント、ユーティリティ関数）
- **統合テスト**: Supertest（API エンドポイント）
- **E2Eテスト**: Playwright（重要ユーザーフロー）

```javascript
// テスト例
describe('Prompt Generation', () => {
  test('should generate personalized resume prompt', async () => {
    const mockUserProfile = {
      experience: ['Web development 3 years'],
      skills: ['React', 'Node.js', 'JavaScript']
    };
    
    const mockJobInfo = {
      companyName: 'Tech Corp',
      position: 'Frontend Developer'
    };
    
    const result = await generatePrompt('resume_optimization', mockUserProfile, mockJobInfo);
    
    expect(result.content).toContain('Tech Corp');
    expect(result.content).toContain('React');
    expect(result.category).toBe('resume');
  });
});
```

### 7.2 品質保証
- **コードレビュー**: GitHubプルリクエスト必須、2名以上承認
- **パフォーマンステスト**: Lighthouse CI、Core Web Vitals測定
- **ユーザビリティテスト**: 週次ユーザーインタビュー（5名以上）

## 8. デプロイ・運用

### 8.1 リリース戦略
- **配布方法**: Progressive Web App（PWA）+ 将来的にネイティブアプリ
- **バージョニング**: セマンティックバージョニング（major.minor.patch）
- **アップデート**: 段階的ロールアウト（5% → 25% → 100%）

```javascript
// デプロイメント設定例
const deploymentConfig = {
  production: {
    frontend: 'Vercel',
    backend: 'Railway',
    database: 'Railway PostgreSQL',
    monitoring: 'Sentry + DataDog'
  },
  staging: {
    frontend: 'Vercel Preview',
    backend: 'Railway Preview',
    database: 'Railway PostgreSQL（staging）'
  }
};
```

### 8.2 監視・分析
- **エラー監視**: Sentry（エラー追跡、パフォーマンス監視）
- **ユーザー分析**: Google Analytics 4 + Mixpanel（行動分析）
- **パフォーマンス監視**: DataDog（インフラ監視）、Lighthouse CI

## 9. セキュリティ

### 9.1 データ保護
- **認証**: Firebase Authentication（多要素認証対応）
- **通信**: HTTPS強制、HSTS設定
- **データベース**: 行レベルセキュリティ（RLS）
- **API**: JWT + Rate Limiting

```javascript
// セキュリティミドルウェア
const securityMiddleware = [
  helmet(), // セキュリティヘッダー
  cors({ origin: process.env.ALLOWED_ORIGINS }),
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15分
    max: 100 // リクエスト制限
  }),
  authenticateJWT
];
```

### 9.2 プライバシー
- **データ収集**: 最小限の必要データのみ
- **GDPR対応**: データ削除・エクスポート機能
- **利用規約**: 明確なプライバシーポリシー

## 10. 運用・保守

### 10.1 監視項目
```javascript
const monitoringMetrics = {
  performance: {
    'API Response Time': '< 200ms',
    'Page Load Time': '< 2s',
    'Database Query Time': '< 100ms'
  },
  business: {
    'Daily Active Users': 'trend monitoring',
    'Subscription Conversion': '> 5%',
    'Feature Usage': 'weekly analysis'
  },
  technical: {
    'Error Rate': '< 1%',
    'Uptime': '> 99.9%',
    'Memory Usage': '< 80%'
  }
};
```

### 10.2 コスト最適化
- **インフラ**: オートスケーリング設定
- **ストレージ**: 古いデータの段階的アーカイブ
- **API**: 効率的なクエリ設計、N+1問題対策

---

この技術仕様書に基づいて、PathPilotの開発チームは即座に実装作業を開始できます。特に企画書で強調されている「AIパイロット」としての価値提供を技術的に実現する方法を具体的に示しています。
