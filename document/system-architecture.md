# PathPilot システムアーキテクチャ設計

## 1. 本質的欲求分析から導出されるシステム要件

### 1.1 ユーザーの本質的欲求
1. **内定獲得への確信**: 「自分でも内定をもらえるかもしれない」体験
2. **個人最適化**: 自分の状況・感情・目標に完全適合したサポート
3. **シームレスAI活用**: 複数AIサービス間での一貫した体験
4. **継続的成長**: 使うほど自分に最適化されるシステム
5. **効率的行動**: 迷いなく次に何をすべきかが明確

### 1.2 システム設計原則
- **ユーザーコンテキスト中心**: すべての機能がユーザー状況を理解
- **AI間オーケストレーション**: Claude/ChatGPT/Gemini等の統合活用
- **学習型進化**: 使用履歴から継続的最適化
- **感情状態考慮**: ストレス・不安レベルに配慮した支援
- **ゼロフリクション**: 最小限の操作で最大の価値提供

## 2. システムアーキテクチャ概要

### 2.1 全体構成図
```
┌─────────────────────────────────────────────────────────────────┐
│                        PathPilot Ecosystem                       │
├─────────────────────────────────────────────────────────────────┤
│  Frontend Layer (Cloudflare Pages)                             │
│  ├─ React 18 + TypeScript + Tailwind CSS                       │
│  ├─ PWA + モバイル対応                                            │
│  └─ Real-time UI Updates                                        │
├─────────────────────────────────────────────────────────────────┤
│  API Gateway Layer (Cloudflare Workers)                        │
│  ├─ プロンプトオーケストレーション API                              │
│  ├─ ユーザーコンテキスト管理 API                                   │
│  ├─ データ抽出・変換 API                                          │
│  └─ AI間連携 API                                                │
├─────────────────────────────────────────────────────────────────┤
│  Core Services Layer                                           │
│  ├─ Prompt Orchestration Engine                                │
│  ├─ User Context Manager                                        │
│  ├─ Screenshot Data Extractor                                  │
│  ├─ AI Analysis Aggregator                                     │
│  └─ Learning & Optimization Engine                             │
├─────────────────────────────────────────────────────────────────┤
│  Data Layer                                                    │
│  ├─ Supabase PostgreSQL (構造化データ)                           │
│  ├─ Cloudflare R2 (ファイル・画像)                               │
│  ├─ Cloudflare KV (キャッシュ・セッション)                        │
│  └─ Cloudflare Durable Objects (リアルタイム状態)                 │
├─────────────────────────────────────────────────────────────────┤
│  External Integrations                                         │
│  ├─ Firebase Auth (認証)                                        │
│  ├─ Stripe (決済)                                              │
│  ├─ SendGrid (メール)                                           │
│  └─ Claude/ChatGPT/Gemini APIs (ユーザー所有)                    │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 段階的アーキテクチャ進化

#### Phase 1: MVP - ユーザーAPIキー統合
```
┌─────────────────────────────────────────────────────────────────┐
│                      Phase 1 Architecture                       │
├─────────────────────────────────────────────────────────────────┤
│  Frontend (Basic)                                              │
│  ├─ React 18 + TypeScript                                       │
│  ├─ プロンプト生成機能                                             │
│  ├─ ユーザーAPIキー管理                                            │
│  └─ 基本コンテキスト管理                                           │
├─────────────────────────────────────────────────────────────────┤
│  Backend (Minimal)                                             │
│  ├─ Cloudflare Workers (ルーティング)                            │
│  ├─ プロンプトテンプレート管理                                      │
│  ├─ ユーザーデータ暗号化保存                                        │
│  └─ 基本学習システム                                              │
├─────────────────────────────────────────────────────────────────┤
│  Storage                                                       │
│  ├─ Supabase PostgreSQL (基本スキーマ)                          │
│  ├─ Cloudflare KV (暗号化APIキー)                               │
│  └─ 使用履歴・学習データ                                           │
├─────────────────────────────────────────────────────────────────┤
│  External APIs (User Provided)                                │
│  ├─ Claude API (ユーザーAPIキー)                                 │
│  ├─ ChatGPT API (ユーザーAPIキー)                                │
│  └─ Gemini API (ユーザーAPIキー)                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### Phase 2: スケール - 高度なAI統合
```
┌─────────────────────────────────────────────────────────────────┐
│                      Phase 2 Architecture                       │
├─────────────────────────────────────────────────────────────────┤
│  Frontend (Enhanced)                                           │
│  ├─ PWA対応 + モバイル最適化                                       │
│  ├─ 高度なコンテキスト管理UI                                        │
│  ├─ AIモデル比較・選択機能                                         │
│  ├─ プレミアム機能制限UI                                           │
│  └─ リアルタイムフィードバック                                      │
├─────────────────────────────────────────────────────────────────┤
│  Backend (Advanced)                                            │
│  ├─ AI間オーケストレーション                                       │
│  ├─ 動的プロンプト最適化                                           │
│  ├─ 学習エンジン（ML）                                            │
│  ├─ ユーザー行動分析                                              │
│  ├─ 段階的機能制限システム                                         │
│  └─ APIコスト追跡（ユーザー別）                                    │
├─────────────────────────────────────────────────────────────────┤
│  Storage (Scalable)                                           │
│  ├─ Cloudflare Durable Objects (リアルタイム)                    │
│  ├─ 拡張データベーススキーマ                                        │
│  ├─ Cloudflare R2 (ファイル・画像)                               │
│  └─ 高度な学習データストレージ                                      │
├─────────────────────────────────────────────────────────────────┤
│  Monetization Features                                         │
│  ├─ Stripe決済統合                                             │
│  ├─ 段階的機能制限                                               │
│  ├─ 使用量制限・追跡                                              │
│  └─ プレミアムテンプレート                                         │
└─────────────────────────────────────────────────────────────────┘
```

#### Phase 3: エンタープライズ - 内蔵AI統合
```
┌─────────────────────────────────────────────────────────────────┐
│                      Phase 3 Architecture                       │
├─────────────────────────────────────────────────────────────────┤
│  Frontend (Enterprise)                                         │
│  ├─ 企業向けダッシュボード                                         │
│  ├─ 高度な分析・レポート機能                                        │
│  ├─ チーム機能・権限管理                                           │
│  ├─ カスタムブランディング                                         │
│  └─ API統合インターフェース                                        │
├─────────────────────────────────────────────────────────────────┤
│  Backend (Enterprise)                                          │
│  ├─ 内蔵AI統合 (PathPilot APIキー)                              │
│  ├─ インテリジェントコスト最適化                                    │
│  ├─ エンタープライズ認証 (SSO)                                     │
│  ├─ 高度なセキュリティ                                            │
│  ├─ スケーラブルマルチテナント                                      │
│  └─ 企業向けAPI                                                 │
├─────────────────────────────────────────────────────────────────┤
│  AI Cost Management System                                     │
│  ├─ リアルタイムコスト監視                                         │
│  ├─ 予算アラート・制限                                            │
│  ├─ AI使用量最適化                                              │
│  ├─ コスト配分・請求                                              │
│  └─ ROI分析・レポート                                            │
├─────────────────────────────────────────────────────────────────┤
│  PathPilot Managed AI Services                                │
│  ├─ Claude API (PathPilot管理)                                 │
│  ├─ ChatGPT API (PathPilot管理)                                │
│  ├─ Gemini API (PathPilot管理)                                 │
│  ├─ 最適モデル自動選択                                            │
│  └─ コスト効率最適化                                              │
└─────────────────────────────────────────────────────────────────┘
```

### 2.3 データフロー
```
User Request → Cloudflare Workers → Context Analysis → 
Prompt Generation → AI Service → Result Processing → 
Learning Update → Response to User
```

## 3. 段階的収益化・機能制限システム

### 3.1 段階的機能制限アーキテクチャ

#### サブスクリプション階層設計
```typescript
interface SubscriptionTier {
  id: 'basic' | 'standard' | 'premium' | 'enterprise';
  name: string;
  monthlyLimits: {
    promptExecutions: number;
    templateAccess: string[];
    aiModels: string[];
    extractionRequests: number;
    storageQuota: number;
  };
  features: {
    contextHistory: number; // 保持履歴数
    realTimeOptimization: boolean;
    teamCollaboration: boolean;
    customTemplates: boolean;
    prioritySupport: boolean;
    analyticsAccess: boolean;
    apiAccess: boolean;
  };
  pricing: {
    monthly: number;
    yearly: number;
  };
}

const SUBSCRIPTION_TIERS: Record<string, SubscriptionTier> = {
  basic: {
    id: 'basic',
    name: 'Basic',
    monthlyLimits: {
      promptExecutions: 50,
      templateAccess: ['cv_analysis', 'cover_letter', 'interview_prep'],
      aiModels: ['claude-3-haiku'],
      extractionRequests: 20,
      storageQuota: 100 // MB
    },
    features: {
      contextHistory: 10,
      realTimeOptimization: false,
      teamCollaboration: false,
      customTemplates: false,
      prioritySupport: false,
      analyticsAccess: false,
      apiAccess: false
    },
    pricing: { monthly: 0, yearly: 0 }
  },
  standard: {
    id: 'standard',
    name: 'Standard',
    monthlyLimits: {
      promptExecutions: 200,
      templateAccess: ['*'], // 全テンプレート
      aiModels: ['claude-3-haiku', 'claude-3-sonnet', 'gpt-4o-mini'],
      extractionRequests: 100,
      storageQuota: 500
    },
    features: {
      contextHistory: 50,
      realTimeOptimization: true,
      teamCollaboration: false,
      customTemplates: true,
      prioritySupport: false,
      analyticsAccess: true,
      apiAccess: false
    },
    pricing: { monthly: 1980, yearly: 19800 }
  },
  premium: {
    id: 'premium',
    name: 'Premium',
    monthlyLimits: {
      promptExecutions: 1000,
      templateAccess: ['*'],
      aiModels: ['claude-3-sonnet', 'claude-3-opus', 'gpt-4o', 'gemini-pro'],
      extractionRequests: 500,
      storageQuota: 2000
    },
    features: {
      contextHistory: 200,
      realTimeOptimization: true,
      teamCollaboration: true,
      customTemplates: true,
      prioritySupport: true,
      analyticsAccess: true,
      apiAccess: true
    },
    pricing: { monthly: 4980, yearly: 49800 }
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    monthlyLimits: {
      promptExecutions: -1, // unlimited
      templateAccess: ['*'],
      aiModels: ['*'],
      extractionRequests: -1,
      storageQuota: -1
    },
    features: {
      contextHistory: -1,
      realTimeOptimization: true,
      teamCollaboration: true,
      customTemplates: true,
      prioritySupport: true,
      analyticsAccess: true,
      apiAccess: true
    },
    pricing: { monthly: 0, yearly: 0 } // カスタム価格
  }
};
```

#### リアルタイム使用量追跡
```typescript
class UsageTracker {
  private kv: KVNamespace;
  private durable: DurableObjectNamespace;

  async trackUsage(
    userId: string, 
    action: UsageAction, 
    metadata?: UsageMetadata
  ): Promise<UsageResult> {
    
    // 現在の使用状況取得
    const currentUsage = await this.getCurrentUsage(userId);
    const userTier = await this.getUserTier(userId);
    const limits = SUBSCRIPTION_TIERS[userTier].monthlyLimits;
    
    // 制限チェック
    const limitCheck = this.checkLimits(action, currentUsage, limits);
    if (!limitCheck.allowed) {
      return {
        success: false,
        reason: limitCheck.reason,
        upgradeRequired: limitCheck.upgradeRequired,
        currentUsage,
        limits
      };
    }
    
    // 使用量更新
    const updatedUsage = await this.incrementUsage(userId, action, metadata);
    
    // リアルタイム監視アラート
    await this.checkThresholds(userId, updatedUsage, limits);
    
    return {
      success: true,
      currentUsage: updatedUsage,
      limits,
      remaining: this.calculateRemaining(updatedUsage, limits)
    };
  }
  
  private async checkThresholds(
    userId: string, 
    usage: CurrentUsage, 
    limits: MonthlyLimits
  ): Promise<void> {
    const thresholds = [0.8, 0.95]; // 80%, 95%
    
    for (const threshold of thresholds) {
      const usageRatio = usage.promptExecutions / limits.promptExecutions;
      
      if (usageRatio >= threshold && !usage.alertsSent.includes(threshold)) {
        await this.sendUsageAlert(userId, threshold, usage, limits);
        await this.markAlertSent(userId, threshold);
      }
    }
  }
  
  async sendUsageAlert(
    userId: string,
    threshold: number,
    usage: CurrentUsage,
    limits: MonthlyLimits
  ): Promise<void> {
    const user = await this.getUser(userId);
    const percentUsed = Math.round(threshold * 100);
    
    // Email通知
    await this.sendEmail({
      to: user.email,
      subject: `PathPilot: ${percentUsed}%の使用量に達しました`,
      template: 'usage_alert',
      data: {
        percentUsed,
        currentUsage: usage.promptExecutions,
        limit: limits.promptExecutions,
        remaining: limits.promptExecutions - usage.promptExecutions,
        upgradeUrl: `${process.env.APP_URL}/upgrade`
      }
    });
    
    // アプリ内通知
    await this.createInAppNotification(userId, {
      type: 'usage_warning',
      title: '使用量アラート',
      message: `今月の使用量が${percentUsed}%に達しました。`,
      actionUrl: '/upgrade',
      actionText: 'プランをアップグレード'
    });
  }
}
```

### 3.2 Phase別AI統合戦略

#### Phase 1-2: ユーザーAPIキー管理
```typescript
class UserAPIKeyManager {
  private encryption: DataEncryption;
  private kv: KVNamespace;
  
  async storeAPIKey(
    userId: string,
    provider: AIProvider,
    apiKey: string,
    validateKey: boolean = true
  ): Promise<APIKeyResult> {
    
    // APIキー検証
    if (validateKey) {
      const validation = await this.validateAPIKey(provider, apiKey);
      if (!validation.valid) {
        return {
          success: false,
          error: validation.error,
          suggestion: this.getKeyValidationHelp(provider)
        };
      }
    }
    
    // 暗号化保存
    const encryptedKey = await this.encryption.encryptSensitiveData({
      provider,
      apiKey,
      userId,
      createdAt: Date.now()
    });
    
    const keyId = `apikey:${userId}:${provider}`;
    await this.kv.put(keyId, JSON.stringify(encryptedKey));
    
    // 使用状況初期化
    await this.initializeKeyUsage(userId, provider);
    
    return {
      success: true,
      provider,
      masked: this.maskAPIKey(apiKey),
      validatedAt: Date.now()
    };
  }
  
  async getAPIKey(userId: string, provider: AIProvider): Promise<string | null> {
    try {
      const keyId = `apikey:${userId}:${provider}`;
      const encryptedData = await this.kv.get(keyId, 'json');
      
      if (!encryptedData) return null;
      
      const decrypted = await this.encryption.decryptSensitiveData(encryptedData);
      return decrypted.apiKey;
    } catch (error) {
      console.error('Failed to retrieve API key:', error);
      return null;
    }
  }
  
  private async validateAPIKey(provider: AIProvider, apiKey: string): Promise<ValidationResult> {
    try {
      switch (provider) {
        case 'claude':
          return await this.validateClaudeKey(apiKey);
        case 'chatgpt':
          return await this.validateOpenAIKey(apiKey);
        case 'gemini':
          return await this.validateGeminiKey(apiKey);
        default:
          return { valid: false, error: 'Unsupported provider' };
      }
    } catch (error) {
      return { valid: false, error: error.message };
    }
  }
  
  private async validateClaudeKey(apiKey: string): Promise<ValidationResult> {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 10,
        messages: [{ role: 'user', content: 'test' }]
      })
    });
    
    if (response.ok) {
      return { valid: true };
    } else if (response.status === 401) {
      return { valid: false, error: 'Invalid API key' };
    } else if (response.status === 403) {
      return { valid: false, error: 'API key lacks necessary permissions' };
    } else {
      return { valid: false, error: 'API key validation failed' };
    }
  }
}
```

#### Phase 3: 内蔵AI統合・コスト管理
```typescript
class PathPilotAIManager {
  private costManager: AICostManager;
  private modelOptimizer: ModelOptimizer;
  private usageAnalytics: UsageAnalytics;
  
  async executePrompt(
    userId: string,
    prompt: PersonalizedPrompt,
    preferences?: AIPreferences
  ): Promise<AIExecutionResult> {
    
    // コスト予算確認
    const budgetCheck = await this.costManager.checkBudget(userId);
    if (!budgetCheck.allowed) {
      return {
        success: false,
        error: 'Monthly AI budget exceeded',
        budgetInfo: budgetCheck.info
      };
    }
    
    // 最適モデル選択
    const selectedModel = await this.modelOptimizer.selectOptimalModel(
      prompt,
      preferences,
      budgetCheck.remainingBudget
    );
    
    // コスト見積もり
    const estimatedCost = this.costManager.estimateCost(prompt, selectedModel);
    
    // 実行
    const startTime = Date.now();
    const result = await this.executeWithModel(selectedModel, prompt);
    const duration = Date.now() - startTime;
    
    // 実際のコスト記録
    const actualCost = this.costManager.calculateActualCost(
      result.tokensUsed,
      selectedModel,
      duration
    );
    
    await this.costManager.recordUsage(userId, {
      prompt: prompt.promptText,
      model: selectedModel,
      tokensUsed: result.tokensUsed,
      duration,
      estimatedCost,
      actualCost,
      timestamp: Date.now()
    });
    
    // 最適化学習
    await this.modelOptimizer.learnFromExecution(
      prompt,
      selectedModel,
      result,
      actualCost,
      duration
    );
    
    return {
      success: true,
      result: result.content,
      metadata: {
        model: selectedModel,
        tokensUsed: result.tokensUsed,
        cost: actualCost,
        duration,
        efficiency: this.calculateEfficiency(result, actualCost, duration)
      }
    };
  }
}

class AICostManager {
  private kv: KVNamespace;
  private analytics: KVNamespace;
  
  async checkBudget(userId: string): Promise<BudgetCheckResult> {
    const user = await this.getUser(userId);
    const tier = SUBSCRIPTION_TIERS[user.subscriptionTier];
    
    // エンタープライズは独自予算
    if (tier.id === 'enterprise') {
      return await this.checkEnterpriseBudget(userId);
    }
    
    const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
    const monthlyUsage = await this.getMonthlyUsage(userId, currentMonth);
    const monthlyBudget = tier.pricing.monthly * 0.3; // 30%をAIコストに配分
    
    const remaining = monthlyBudget - monthlyUsage.totalCost;
    
    return {
      allowed: remaining > 0,
      remainingBudget: Math.max(0, remaining),
      usageRatio: monthlyUsage.totalCost / monthlyBudget,
      info: {
        monthlyBudget,
        usedAmount: monthlyUsage.totalCost,
        remaining,
        requestsThisMonth: monthlyUsage.requestCount
      }
    };
  }
  
  async recordUsage(userId: string, usage: AIUsageRecord): Promise<void> {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const usageKey = `usage:${userId}:${currentMonth}`;
    
    // 月次使用量更新
    const monthlyData = await this.kv.get(usageKey, 'json') || {
      userId,
      month: currentMonth,
      totalCost: 0,
      requestCount: 0,
      modelUsage: {},
      dailyUsage: {}
    };
    
    monthlyData.totalCost += usage.actualCost;
    monthlyData.requestCount += 1;
    monthlyData.modelUsage[usage.model] = (monthlyData.modelUsage[usage.model] || 0) + usage.actualCost;
    
    const today = new Date().toISOString().slice(0, 10);
    monthlyData.dailyUsage[today] = (monthlyData.dailyUsage[today] || 0) + usage.actualCost;
    
    await this.kv.put(usageKey, JSON.stringify(monthlyData));
    
    // 詳細ログ
    const logKey = `log:${userId}:${Date.now()}`;
    await this.kv.put(logKey, JSON.stringify(usage), { expirationTtl: 86400 * 30 }); // 30日保持
    
    // アラート確認
    await this.checkCostAlerts(userId, monthlyData);
  }
  
  private async checkCostAlerts(
    userId: string, 
    monthlyData: MonthlyUsageData
  ): Promise<void> {
    const user = await this.getUser(userId);
    const tier = SUBSCRIPTION_TIERS[user.subscriptionTier];
    const monthlyBudget = tier.pricing.monthly * 0.3;
    
    const usageRatio = monthlyData.totalCost / monthlyBudget;
    const thresholds = [0.7, 0.9, 1.0]; // 70%, 90%, 100%
    
    for (const threshold of thresholds) {
      if (usageRatio >= threshold && !monthlyData.alertsSent?.includes(threshold)) {
        await this.sendCostAlert(userId, threshold, monthlyData, monthlyBudget);
        monthlyData.alertsSent = [...(monthlyData.alertsSent || []), threshold];
      }
    }
  }
}

class ModelOptimizer {
  private learningData: KVNamespace;
  
  async selectOptimalModel(
    prompt: PersonalizedPrompt,
    preferences: AIPreferences,
    remainingBudget: number
  ): Promise<AIModel> {
    
    const promptComplexity = this.analyzeComplexity(prompt);
    const availableModels = this.getAvailableModels(remainingBudget);
    
    // 過去の実行データから学習
    const historicalData = await this.getHistoricalPerformance(
      prompt.metadata.templateId,
      promptComplexity
    );
    
    // モデル候補をスコアリング
    const modelScores = await Promise.all(
      availableModels.map(async model => {
        const costScore = this.calculateCostScore(model, remainingBudget);
        const qualityScore = this.calculateQualityScore(model, promptComplexity, historicalData);
        const speedScore = this.calculateSpeedScore(model);
        
        const weightedScore = 
          costScore * (preferences?.costWeight || 0.3) +
          qualityScore * (preferences?.qualityWeight || 0.5) +
          speedScore * (preferences?.speedWeight || 0.2);
        
        return { model, score: weightedScore };
      })
    );
    
    // 最高スコアのモデル選択
    const selectedModel = modelScores.reduce((best, current) => 
      current.score > best.score ? current : best
    ).model;
    
    // 選択理由をログ
    await this.logModelSelection(prompt, selectedModel, modelScores, preferences);
    
    return selectedModel;
  }
  
  async learnFromExecution(
    prompt: PersonalizedPrompt,
    model: AIModel,
    result: AIResult,
    cost: number,
    duration: number
  ): Promise<void> {
    const complexity = this.analyzeComplexity(prompt);
    const quality = this.assessResultQuality(result);
    
    const learningRecord = {
      templateId: prompt.metadata.templateId,
      complexity,
      model,
      cost,
      duration,
      quality,
      tokensUsed: result.tokensUsed,
      success: result.success,
      timestamp: Date.now()
    };
    
    const learningKey = `learning:${prompt.metadata.templateId}:${complexity}`;
    const existingData = await this.learningData.get(learningKey, 'json') || { records: [] };
    
    existingData.records.push(learningRecord);
    
    // 最新100件のみ保持
    if (existingData.records.length > 100) {
      existingData.records = existingData.records.slice(-100);
    }
    
    await this.learningData.put(learningKey, JSON.stringify(existingData));
  }
}
```

## 4. 核心システム設計

### 4.1 プロンプトオーケストレーション・エンジン

#### アーキテクチャ
```typescript
// Core Orchestration Engine
interface PromptOrchestrationEngine {
  contextManager: UserContextManager;
  templateEngine: PromptTemplateEngine;
  emotionAnalyzer: EmotionAnalyzer;
  learningOptimizer: LearningOptimizer;
  aiModelAdapter: AIModelAdapter;
}

// リアルタイムコンテキスト管理
class UserContextManager {
  private durableObject: DurableObjectNamespace;
  private kv: KVNamespace;
  
  async updateContext(userId: string, contextUpdate: ContextUpdate): Promise<UserContext> {
    // Durable Objectsで状態管理
    const contextObject = this.durableObject.get(userId);
    return await contextObject.updateContext(contextUpdate);
  }
  
  async getContextForPrompt(userId: string, objective: string): Promise<ContextualData> {
    const userContext = await this.getContext(userId);
    const relevantHistory = await this.getRelevantHistory(userId, objective);
    const emotionalState = await this.analyzeEmotionalState(userContext);
    
    return {
      userContext,
      relevantHistory,
      emotionalState,
      timestamp: Date.now()
    };
  }
}
```

#### 動的プロンプト生成
```typescript
class DynamicPromptGenerator {
  async generatePersonalizedPrompt(
    contextData: ContextualData,
    objective: PromptObjective,
    targetData?: TargetContext
  ): Promise<PersonalizedPrompt> {
    
    // 1. テンプレート選択
    const template = await this.selectOptimalTemplate(contextData, objective);
    
    // 2. 感情状態適応
    const emotionAdaptedTemplate = this.adaptToEmotionalState(
      template, 
      contextData.emotionalState
    );
    
    // 3. 個人化変数生成
    const personalVariables = this.generatePersonalVariables(contextData, targetData);
    
    // 4. コンテキスト注入
    const contextualizedPrompt = this.injectContext(
      emotionAdaptedTemplate,
      personalVariables,
      contextData.relevantHistory
    );
    
    // 5. 品質最適化
    const optimizedPrompt = await this.optimizeForEffectiveness(
      contextualizedPrompt,
      contextData.userContext.preferences
    );
    
    return {
      promptText: optimizedPrompt,
      metadata: {
        templateId: template.id,
        personalizationScore: this.calculatePersonalizationScore(optimizedPrompt),
        expectedEffectiveness: this.predictEffectiveness(optimizedPrompt, contextData),
        usageInstructions: this.generateUsageInstructions(objective),
        followUpActions: this.suggestFollowUpActions(contextData, objective)
      }
    };
  }
}
```

### 3.2 AI間シームレス連携システム

#### マルチAIアダプター
```typescript
class MultiAIAdapter {
  private adapters: Map<AIProvider, AIServiceAdapter>;
  
  constructor() {
    this.adapters = new Map([
      ['claude', new ClaudeAdapter()],
      ['chatgpt', new ChatGPTAdapter()],
      ['gemini', new GeminiAdapter()]
    ]);
  }
  
  async executePrompt(
    provider: AIProvider,
    prompt: PersonalizedPrompt,
    userCredentials: AICredentials
  ): Promise<AIExecutionResult> {
    const adapter = this.adapters.get(provider);
    
    // プロバイダー固有の最適化
    const optimizedPrompt = await adapter.optimizePrompt(prompt);
    
    // 実行とレスポンス標準化
    const rawResult = await adapter.execute(optimizedPrompt, userCredentials);
    const standardizedResult = await adapter.standardizeResponse(rawResult);
    
    // 学習データとして記録
    await this.recordExecution(provider, prompt, standardizedResult);
    
    return standardizedResult;
  }
}

// プロバイダー固有アダプター例
class ClaudeAdapter implements AIServiceAdapter {
  async optimizePrompt(prompt: PersonalizedPrompt): Promise<string> {
    // Claude固有の最適化（XML形式、thinking blocks等）
    return `<thinking>
${prompt.metadata.usageInstructions}
</thinking>

${prompt.promptText}

Please provide a structured response that the user can easily copy to PathPilot.`;
  }
  
  async execute(prompt: string, credentials: ClaudeCredentials): Promise<RawAIResponse> {
    // Claude API呼び出し（ユーザーのAPIキー使用）
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${credentials.apiKey}`,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: credentials.model || 'claude-3-sonnet-20240229',
        max_tokens: 4000,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    
    return await response.json();
  }
}
```

### 3.3 スクリーンショット→データ抽出システム

#### 画像分析パイプライン
```typescript
class ScreenshotAnalysisPipeline {
  async generateExtractionPrompt(
    dataType: ExtractionType,
    userContext: UserContext,
    extractionFields: ExtractionField[]
  ): Promise<ExtractionPrompt> {
    
    // ユーザーの関心事項でフィールド優先度決定
    const prioritizedFields = this.prioritizeFields(extractionFields, userContext);
    
    // コンテキスト化されたプロンプト生成
    const contextualizedPrompt = this.generateContextualizedPrompt(
      dataType,
      prioritizedFields,
      userContext.goals,
      userContext.preferences
    );
    
    return {
      promptText: contextualizedPrompt,
      expectedFields: prioritizedFields,
      validationRules: this.generateValidationRules(dataType, prioritizedFields),
      userGuidance: this.generateUserGuidance(dataType, userContext.preferences)
    };
  }
  
  async processExtractionResult(
    rawResult: string,
    originalPrompt: ExtractionPrompt,
    userContext: UserContext
  ): Promise<ProcessedExtractionResult> {
    
    // JSON構造検証
    const validatedData = await this.validateStructure(rawResult, originalPrompt.expectedFields);
    
    // 完全性評価
    const completenessScore = this.assessCompleteness(validatedData, originalPrompt.expectedFields);
    
    // 不足データ特定
    const missingFields = this.identifyMissingFields(validatedData, originalPrompt.expectedFields);
    
    // 補完プロンプト生成（必要に応じて）
    const completionPrompts = missingFields.length > 0 
      ? await this.generateCompletionPrompts(missingFields, userContext)
      : [];
    
    // PathPilot内部データ形式に変換
    const structuredData = await this.convertToInternalFormat(validatedData, userContext);
    
    return {
      data: structuredData,
      completeness: completenessScore,
      missingFields,
      completionPrompts,
      confidence: this.calculateConfidenceScore(validatedData),
      suggestedActions: this.generateActionSuggestions(structuredData, userContext)
    };
  }
}
```

### 3.4 学習・最適化エンジン

#### 継続学習システム
```typescript
class LearningOptimizationEngine {
  private learningStore: KVNamespace;
  private analyticsCollector: AnalyticsCollector;
  
  async optimizePromptEffectiveness(
    userId: string,
    prompt: PersonalizedPrompt,
    executionResult: AIExecutionResult,
    userFeedback?: UserFeedback
  ): Promise<OptimizationInsights> {
    
    // 実行結果分析
    const executionAnalysis = await this.analyzeExecution(prompt, executionResult);
    
    // ユーザー満足度推測
    const satisfactionScore = await this.estimateSatisfaction(
      executionResult,
      userFeedback,
      await this.getUserContext(userId)
    );
    
    // パターン学習
    const learningInsights = await this.extractLearningPatterns(
      userId,
      prompt,
      executionResult,
      satisfactionScore
    );
    
    // 次回改善提案
    const improvementSuggestions = await this.generateImprovements(learningInsights);
    
    // 学習データ保存
    await this.storeLearningData(userId, {
      prompt,
      executionResult,
      satisfactionScore,
      learningInsights,
      timestamp: Date.now()
    });
    
    return {
      currentEffectiveness: satisfactionScore,
      improvementSuggestions,
      learningInsights,
      nextOptimizations: this.suggestNextOptimizations(learningInsights)
    };
  }
  
  async predictPromptSuccess(
    prompt: PersonalizedPrompt,
    userContext: UserContext
  ): Promise<SuccessPrediction> {
    
    // 類似パターン検索
    const similarExecutions = await this.findSimilarExecutions(prompt, userContext);
    
    // 成功確率計算
    const successProbability = this.calculateSuccessProbability(
      prompt,
      userContext,
      similarExecutions
    );
    
    // リスク要因特定
    const riskFactors = this.identifyRiskFactors(prompt, userContext, similarExecutions);
    
    // 改善提案
    const improvements = this.suggestPreExecutionImprovements(riskFactors);
    
    return {
      successProbability,
      riskFactors,
      improvements,
      confidence: this.calculatePredictionConfidence(similarExecutions)
    };
  }
}
```

## 5. データベース設計

### 5.1 Supabase PostgreSQL スキーマ（拡張版）
```sql
-- ユーザー基本情報（拡張版）
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  subscription_tier VARCHAR(50) DEFAULT 'basic',
  language_preference VARCHAR(10) DEFAULT 'ja',
  subscription_start_date TIMESTAMP WITH TIME ZONE,
  subscription_end_date TIMESTAMP WITH TIME ZONE,
  stripe_customer_id VARCHAR(255),
  trial_end_date TIMESTAMP WITH TIME ZONE,
  billing_cycle VARCHAR(20) DEFAULT 'monthly', -- monthly, yearly
  is_enterprise BOOLEAN DEFAULT FALSE,
  enterprise_settings JSONB
);

-- サブスクリプション管理
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  tier VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL, -- active, canceled, past_due, unpaid
  stripe_subscription_id VARCHAR(255),
  current_period_start TIMESTAMP WITH TIME ZONE NOT NULL,
  current_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 使用量追跡
CREATE TABLE usage_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  month VARCHAR(7) NOT NULL, -- YYYY-MM
  prompt_executions INTEGER DEFAULT 0,
  extraction_requests INTEGER DEFAULT 0,
  storage_used_mb INTEGER DEFAULT 0,
  api_calls_made INTEGER DEFAULT 0,
  ai_cost_total DECIMAL(10,4) DEFAULT 0.00,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, month)
);

-- AIコスト追跡
CREATE TABLE ai_cost_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  usage_tracking_id UUID REFERENCES usage_tracking(id) ON DELETE CASCADE,
  model_name VARCHAR(100) NOT NULL,
  tokens_used INTEGER NOT NULL,
  cost_amount DECIMAL(10,6) NOT NULL,
  execution_duration INTEGER, -- milliseconds
  prompt_template_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 使用量アラート
CREATE TABLE usage_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  alert_type VARCHAR(50) NOT NULL, -- usage_threshold, cost_threshold, limit_reached
  threshold_percentage FLOAT NOT NULL,
  triggered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved_at TIMESTAMP WITH TIME ZONE,
  notification_sent BOOLEAN DEFAULT FALSE,
  metadata JSONB
);

-- ユーザープロファイル
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  full_name VARCHAR(255),
  current_position VARCHAR(255),
  experience JSONB,
  skills JSONB,
  target_role VARCHAR(255),
  target_salary INTEGER,
  preferred_locations JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ユーザーコンテキスト（動的状態）
CREATE TABLE user_contexts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  current_state JSONB NOT NULL,
  goals JSONB NOT NULL,
  preferences JSONB NOT NULL,
  emotional_state JSONB,
  stress_level FLOAT DEFAULT 0.5,
  motivation_level VARCHAR(50) DEFAULT 'medium',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- プロンプト実行履歴
CREATE TABLE prompt_executions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  template_id VARCHAR(255) NOT NULL,
  objective VARCHAR(255) NOT NULL,
  prompt_text TEXT NOT NULL,
  ai_provider VARCHAR(50) NOT NULL,
  execution_result JSONB,
  satisfaction_score FLOAT,
  effectiveness_score FLOAT,
  personalization_level FLOAT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 学習データ
CREATE TABLE learning_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  pattern_type VARCHAR(100) NOT NULL,
  pattern_data JSONB NOT NULL,
  confidence_score FLOAT NOT NULL,
  success_correlation FLOAT,
  improvement_suggestions JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- アプリケーション管理
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  company_name VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL,
  applied_date DATE,
  salary_range VARCHAR(100),
  notes TEXT,
  priority_score FLOAT DEFAULT 0.5,
  success_probability FLOAT,
  ai_analysis_results JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- プロンプトテンプレート
CREATE TABLE prompt_templates (
  id VARCHAR(255) PRIMARY KEY,
  category VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  template_text TEXT NOT NULL,
  variables JSONB,
  instructions TEXT,
  subscription_tier VARCHAR(50) DEFAULT 'basic',
  effectiveness_score FLOAT DEFAULT 0.5,
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 拡張インデックス作成
CREATE INDEX idx_user_contexts_user_id ON user_contexts(user_id);
CREATE INDEX idx_prompt_executions_user_id ON prompt_executions(user_id);
CREATE INDEX idx_prompt_executions_template_id ON prompt_executions(template_id);
CREATE INDEX idx_learning_insights_user_id ON learning_insights(user_id);
CREATE INDEX idx_applications_user_id ON applications(user_id);
CREATE INDEX idx_applications_status ON applications(status);

-- 新規インデックス
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_usage_tracking_user_month ON usage_tracking(user_id, month);
CREATE INDEX idx_ai_cost_tracking_user_id ON ai_cost_tracking(user_id);
CREATE INDEX idx_ai_cost_tracking_model ON ai_cost_tracking(model_name);
CREATE INDEX idx_usage_alerts_user_id ON usage_alerts(user_id);
CREATE INDEX idx_usage_alerts_type ON usage_alerts(alert_type);

-- 複合インデックス
CREATE INDEX idx_ai_cost_tracking_user_date ON ai_cost_tracking(user_id, created_at);
CREATE INDEX idx_usage_alerts_user_resolved ON usage_alerts(user_id, resolved_at) WHERE resolved_at IS NULL;
```

### 4.2 Cloudflare KV ストレージ設計
```typescript
// セッション管理
interface SessionData {
  userId: string;
  contextSnapshot: UserContext;
  activeObjectives: string[];
  lastActivity: number;
  preferences: UserPreferences;
}

// プロンプトキャッシュ
interface PromptCache {
  templateId: string;
  contextHash: string;
  generatedPrompt: PersonalizedPrompt;
  cacheTimestamp: number;
  hitCount: number;
}

// リアルタイム学習キャッシュ
interface LearningCache {
  userId: string;
  recentPatterns: LearningPattern[];
  optimizationSuggestions: OptimizationSuggestion[];
  effectivenessScores: Map<string, number>;
  lastUpdate: number;
}
```

## 6. API エンドポイント設計

### 6.1 プロンプトオーケストレーション API
```typescript
// GET /api/prompts/recommend
// ユーザーの現在状況に基づく推奨プロンプト
interface RecommendPromptsRequest {
  userId: string;
  currentContext?: Partial<UserContext>;
  objective?: string;
  urgency?: 'low' | 'medium' | 'high';
}

interface RecommendPromptsResponse {
  recommendations: PromptRecommendation[];
  contextAnalysis: ContextAnalysis;
  nextSuggestedActions: ActionSuggestion[];
}

// POST /api/prompts/generate
// パーソナライズされたプロンプト生成
interface GeneratePromptRequest {
  userId: string;
  templateId: string;
  objective: string;
  targetContext?: TargetContext;
  customization?: PromptCustomization;
}

interface GeneratePromptResponse {
  prompt: PersonalizedPrompt;
  usageInstructions: UsageInstructions;
  expectedOutcome: ExpectedOutcome;
  followUpActions: FollowUpAction[];
}

// POST /api/extractions/generate-prompt
// スクリーンショット分析用プロンプト生成
interface GenerateExtractionPromptRequest {
  userId: string;
  dataType: 'job_posting' | 'company_info' | 'application_status';
  extractionFields: ExtractionField[];
  priority?: 'speed' | 'accuracy' | 'completeness';
}

interface GenerateExtractionPromptResponse {
  extractionPrompt: ExtractionPrompt;
  userGuidance: UserGuidance;
  validationRules: ValidationRule[];
}

// POST /api/extractions/process
// AI分析結果の処理とインポート
interface ProcessExtractionRequest {
  userId: string;
  originalPromptId: string;
  extractionResult: string;
  sourceType: 'screenshot' | 'text' | 'pdf';
}

interface ProcessExtractionResponse {
  processedData: ProcessedData;
  completeness: CompletenessAssessment;
  suggestions: CompletionSuggestion[];
  importActions: ImportAction[];
}
```

### 6.2 段階的機能制限・使用量管理 API
```typescript
// GET /api/usage/{userId}
// ユーザーの現在使用状況取得
interface GetUsageResponse {
  currentUsage: {
    promptExecutions: number;
    extractionRequests: number;
    storageUsedMB: number;
    aiCostTotal: number;
  };
  limits: {
    promptExecutions: number;
    extractionRequests: number;
    storageQuotaMB: number;
    monthlyBudget: number;
  };
  remaining: {
    promptExecutions: number;
    extractionRequests: number;
    storageQuotaMB: number;
    budget: number;
  };
  usageRatio: {
    prompts: number; // 0-1
    storage: number;
    budget: number;
  };
  currentTier: SubscriptionTier;
  nextResetDate: string;
}

// POST /api/usage/check
// 使用前制限チェック
interface CheckUsageRequest {
  userId: string;
  action: 'prompt_execution' | 'extraction_request' | 'storage_upload';
  estimatedCost?: number;
  estimatedStorageMB?: number;
}

interface CheckUsageResponse {
  allowed: boolean;
  reason?: string;
  upgradeRequired?: boolean;
  currentUsage: CurrentUsage;
  limits: UsageLimits;
  upgradeOptions?: UpgradeOption[];
}

// GET /api/subscription/{userId}
// サブスクリプション情報取得
interface GetSubscriptionResponse {
  subscription: {
    tier: string;
    status: string;
    currentPeriodStart: string;
    currentPeriodEnd: string;
    billingCycle: string;
  };
  features: TierFeatures;
  billing: {
    nextPaymentDate: string;
    amount: number;
    currency: string;
  };
  usage: MonthlyUsage;
}

// POST /api/subscription/upgrade
// サブスクリプションアップグレード
interface UpgradeSubscriptionRequest {
  userId: string;
  targetTier: string;
  billingCycle: 'monthly' | 'yearly';
  paymentMethodId?: string;
}

interface UpgradeSubscriptionResponse {
  success: boolean;
  subscription: SubscriptionDetails;
  clientSecret?: string; // Stripe Payment Intent
  requiresAction?: boolean;
}
```

### 6.3 Phase 3 AI コスト管理 API
```typescript
// GET /api/ai-costs/{userId}
// AIコスト分析取得
interface GetAICostsResponse {
  monthlyBreakdown: {
    totalCost: number;
    modelUsage: Record<string, number>;
    dailyUsage: Record<string, number>;
    efficiency: {
      costPerPrompt: number;
      costPerToken: number;
      averageResponseTime: number;
    };
  };
  costPrediction: {
    projectedMonthlyCost: number;
    budgetExhaustionDate?: string;
    recommendedBudget: number;
  };
  optimizationSuggestions: OptimizationSuggestion[];
}

// POST /api/ai-costs/budget
// AI予算設定・更新
interface SetAIBudgetRequest {
  userId: string;
  monthlyBudget: number;
  autoTopUp?: boolean;
  alertThresholds?: number[]; // [0.7, 0.9] etc.
}

// GET /api/ai-costs/optimization
// コスト最適化提案
interface GetOptimizationResponse {
  currentEfficiency: EfficiencyMetrics;
  improvementOpportunities: {
    modelOptimization: ModelOptimizationSuggestion[];
    promptOptimization: PromptOptimizationSuggestion[];
    usagePatterns: UsageOptimizationSuggestion[];
  };
  projectedSavings: {
    monthly: number;
    percentage: number;
  };
}

// POST /api/ai-costs/alert
// コストアラート設定
interface SetCostAlertRequest {
  userId: string;
  alertType: 'threshold' | 'daily_limit' | 'weekly_summary';
  threshold?: number; // 0.7 = 70%
  notificationMethods: ('email' | 'in_app' | 'slack')[];
  isActive: boolean;
}
```

### 6.4 学習・最適化 API
```typescript
// POST /api/learning/feedback
// ユーザーフィードバック収集
interface SubmitFeedbackRequest {
  userId: string;
  executionId: string;
  satisfactionScore: number; // 1-5
  feedback?: string;
  outcomes?: ExecutionOutcome[];
}

// GET /api/learning/insights/{userId}
// パーソナライズされた学習インサイト
interface GetInsightsResponse {
  personalPatterns: LearningPattern[];
  improvementAreas: ImprovementArea[];
  successFactors: SuccessFactor[];
  optimizationSuggestions: OptimizationSuggestion[];
}

// POST /api/learning/optimize
// リアルタイム最適化実行
interface OptimizeRequest {
  userId: string;
  currentPrompt: PersonalizedPrompt;
  optimizationGoals: OptimizationGoal[];
}

interface OptimizeResponse {
  optimizedPrompt: PersonalizedPrompt;
  improvements: Improvement[];
  predictedEffectiveness: number;
}
```

## 7. デプロイメント・運用設計

### 7.1 Cloudflare Workers デプロイメント
```typescript
// wrangler.toml
name = "pathpilot-api"
main = "src/index.ts"
compatibility_date = "2024-01-01"

[env.production]
name = "pathpilot-api-prod"
vars = { ENVIRONMENT = "production" }
kv_namespaces = [
  { binding = "SESSION_STORE", id = "session-store-prod" },
  { binding = "PROMPT_CACHE", id = "prompt-cache-prod" },
  { binding = "LEARNING_CACHE", id = "learning-cache-prod" }
]
durable_objects.bindings = [
  { name = "USER_CONTEXT", class_name = "UserContextManager" }
]

[[env.production.r2_buckets]]
binding = "STORAGE"
bucket_name = "pathpilot-storage-prod"

[env.staging]
name = "pathpilot-api-staging"
vars = { ENVIRONMENT = "staging" }
```

### 7.2 CI/CD パイプライン
```yaml
# .github/workflows/deploy.yml
name: Deploy PathPilot
on:
  push:
    branches: [main, staging]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run test
      - run: npm run type-check

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          environment: ${{ github.ref == 'refs/heads/main' && 'production' || 'staging' }}
```

### 7.3 監視・アラート設定
```typescript
// monitoring.ts - Cloudflare Analytics統合
class SystemMonitoring {
  async trackAPIPerformance(request: Request, response: Response, duration: number) {
    const metrics = {
      endpoint: new URL(request.url).pathname,
      method: request.method,
      status: response.status,
      duration,
      timestamp: Date.now()
    };
    
    // Cloudflare Analytics Worker
    await this.sendToAnalytics(metrics);
    
    // アラート判定
    if (duration > 1000) {
      await this.sendAlert('high_latency', metrics);
    }
    
    if (response.status >= 500) {
      await this.sendAlert('server_error', metrics);
    }
  }
  
  async sendAlert(type: string, data: any) {
    // Slack Webhook
    await fetch(process.env.SLACK_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `🚨 PathPilot Alert: ${type}`,
        attachments: [{
          color: 'danger',
          fields: Object.entries(data).map(([key, value]) => ({
            title: key,
            value: String(value),
            short: true
          }))
        }]
      })
    });
  }
}
```

## 8. セキュリティ・プライバシー設計

### 8.1 データ暗号化
```typescript
class DataEncryption {
  private async getEncryptionKey(): Promise<CryptoKey> {
    return await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(process.env.ENCRYPTION_KEY!),
      { name: 'AES-GCM' },
      false,
      ['encrypt', 'decrypt']
    );
  }
  
  async encryptSensitiveData(data: any): Promise<EncryptedData> {
    const key = await this.getEncryptionKey();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const dataBuffer = new TextEncoder().encode(JSON.stringify(data));
    
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      dataBuffer
    );
    
    return {
      data: Array.from(new Uint8Array(encrypted)),
      iv: Array.from(iv)
    };
  }
  
  async decryptSensitiveData(encryptedData: EncryptedData): Promise<any> {
    const key = await this.getEncryptionKey();
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: new Uint8Array(encryptedData.iv) },
      key,
      new Uint8Array(encryptedData.data)
    );
    
    return JSON.parse(new TextDecoder().decode(decrypted));
  }
}
```

### 8.2 アクセス制御
```typescript
class AccessControl {
  async validateUserAccess(request: Request): Promise<UserSession | null> {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) return null;
    
    const token = authHeader.substring(7);
    
    // Firebase Auth検証
    try {
      const decodedToken = await this.verifyFirebaseToken(token);
      const session = await this.getActiveSession(decodedToken.uid);
      
      // セッション有効性確認
      if (session && session.expiresAt > Date.now()) {
        return session;
      }
    } catch (error) {
      console.error('Auth validation failed:', error);
    }
    
    return null;
  }
  
  async enforceSubscriptionTier(
    userId: string, 
    requiredTier: SubscriptionTier
  ): Promise<boolean> {
    const user = await this.getUserSubscription(userId);
    const tierLevels = { basic: 1, standard: 2, premium: 3 };
    
    return tierLevels[user.tier] >= tierLevels[requiredTier];
  }
}
```

このシステム設計により、PathPilotは本質的なユーザー欲求を満たしながら、Claude Codeからの効率的な運用とコスト最適化を実現します。