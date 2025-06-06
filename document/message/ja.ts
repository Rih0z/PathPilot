// 日本語メッセージ定義
export const jaMessages = {
  common: {
    loading: '読み込み中...',
    error: 'エラーが発生しました',
    success: '成功しました',
    cancel: 'キャンセル',
    save: '保存',
    delete: '削除',
    edit: '編集',
    add: '追加',
    close: '閉じる',
    confirm: '確認',
    generating: '生成中...',
    processing: '処理中...',
    copying: 'コピー中...',
    copied: 'コピーしました',
    retry: '再試行',
    back: '戻る',
    next: '次へ',
    previous: '前へ',
    finish: '完了',
    skip: 'スキップ'
  },

  auth: {
    login: 'ログイン',
    logout: 'ログアウト',
    register: '新規登録',
    email: 'メールアドレス',
    password: 'パスワード',
    forgotPassword: 'パスワードを忘れた方',
    resetPassword: 'パスワードリセット',
    loginWithGoogle: 'Googleでログイン',
    welcomeBack: 'おかえりなさい',
    createAccount: 'アカウント作成',
    alreadyHaveAccount: 'すでにアカウントをお持ちですか？',
    noAccount: 'アカウントをお持ちでない方',
    invalidCredentials: 'メールアドレスまたはパスワードが正しくありません',
    emailRequired: 'メールアドレスを入力してください',
    passwordRequired: 'パスワードを入力してください'
  },

  navigation: {
    dashboard: 'ダッシュボード',
    prompts: 'プロンプト',
    applications: '応募管理',
    settings: '設定',
    profile: 'プロフィール',
    subscription: 'サブスクリプション',
    help: 'ヘルプ',
    feedback: 'フィードバック'
  },

  dashboard: {
    welcome: 'おかえりなさい、{name}さん',
    welcomeDefault: 'おかえりなさい',
    todayActions: '今日のアクション',
    progress: '進捗状況',
    recentActivity: '最近のアクティビティ',
    quickStats: '概要統計',
    noActionsToday: '今日のアクションはありません',
    noRecentActivity: '最近のアクティビティはありません',
    viewAll: 'すべて表示',
    stats: {
      applications: '応募数',
      interviews: '面接数',
      offers: '内定数',
      successRate: '成功率',
      responseRate: '返答率',
      averageResponseTime: '平均返答時間',
      activeApplications: '進行中の応募',
      completedApplications: '完了した応募'
    },
    actions: {
      prepareInterview: '面接準備',
      followUp: 'フォローアップ',
      applyToJob: '求人応募',
      updateResume: '履歴書更新',
      researchCompany: '企業研究',
      practiceInterview: '面接練習'
    }
  },

  prompts: {
    title: 'プロンプト生成',
    generate: 'プロンプトを生成',
    copy: 'コピー',
    generated: '生成されたプロンプト',
    targetInfo: 'ターゲット情報',
    usageInstructions: '使用方法',
    followUp: 'フォローアップアクション',
    recommendations: 'おすすめプロンプト',
    history: 'プロンプト履歴',
    categories: 'カテゴリ',
    search: 'プロンプトを検索',
    noResults: '該当するプロンプトが見つかりません',
    selectObjective: '目的を選択してください',
    enterTargetInfo: 'ターゲット情報を入力してください',
    generationFailed: 'プロンプト生成に失敗しました',
    copySuccess: 'プロンプトをクリップボードにコピーしました',
    
    categories: {
      resume: '履歴書・職務経歴書',
      coverLetter: '志望動機・カバーレター',
      interview: '面接対策',
      research: '企業研究',
      networking: 'ネットワーキング',
      negotiation: '条件交渉',
      followUp: 'フォローアップ',
      portfolio: 'ポートフォリオ'
    },
    
    objectives: {
      optimizeResume: '履歴書最適化',
      writeMotivation: '志望動機作成',
      prepareInterview: '面接準備',
      researchCompany: '企業研究',
      writeThankYou: 'お礼メール作成',
      negotiateSalary: '年収交渉',
      improveLinkedIn: 'LinkedIn最適化',
      createPortfolio: 'ポートフォリオ作成'
    },

    templates: {
      basic: 'ベーシック',
      standard: 'スタンダード',
      premium: 'プレミアム',
      effectivenessScore: '効果スコア',
      usageCount: '使用回数',
      lastUpdated: '最終更新',
      preview: 'プレビュー'
    }
  },

  applications: {
    title: '応募管理',
    add: '新しい応募を追加',
    edit: '応募を編集',
    delete: '応募を削除',
    view: '詳細を表示',
    company: '企業名',
    position: '職種',
    salary: '年収',
    location: '勤務地',
    appliedDate: '応募日',
    status: 'ステータス',
    priority: '優先度',
    notes: 'メモ',
    nextAction: '次のアクション',
    deadline: '締切',
    contacts: '連絡先',
    documents: '書類',
    timeline: 'タイムライン',
    analysis: 'AI分析',
    
    status: {
      research: '企業研究',
      applied: '応募済み',
      documentReview: '書類選考',
      interview1: '一次面接',
      interview2: '二次面接',
      interviewFinal: '最終面接',
      offer: '内定',
      rejected: '不採用',
      withdrawn: '辞退'
    },
    
    priority: {
      high: '高',
      medium: '中',
      low: '低'
    },
    
    actions: {
      scheduleInterview: '面接スケジュール',
      prepareDocuments: '書類準備',
      sendFollowUp: 'フォローアップ送信',
      updateStatus: 'ステータス更新',
      addNotes: 'メモ追加',
      setReminder: 'リマインダー設定'
    },
    
    filters: {
      all: 'すべて',
      active: '進行中',
      pending: '待機中',
      completed: '完了',
      byStatus: 'ステータス別',
      byPriority: '優先度別',
      byDate: '日付別'
    },
    
    empty: {
      title: 'まだ応募がありません',
      description: '最初の応募を追加して就活を始めましょう',
      action: '応募を追加'
    }
  },

  extraction: {
    title: 'データ抽出',
    uploadScreenshot: 'スクリーンショットをアップロード',
    generatePrompt: '抽出プロンプトを生成',
    processResult: '結果を処理',
    importData: 'データをインポート',
    extractionTypes: {
      jobPosting: '求人情報',
      companyInfo: '企業情報',
      applicationStatus: '応募状況',
      interview: '面接情報'
    },
    instructions: {
      step1: '求人サイトのスクリーンショットを撮影',
      step2: '生成されたプロンプトをClaude/ChatGPTにコピー',
      step3: 'スクリーンショットを添付してAI実行',
      step4: '結果をPathPilotに貼り付けてインポート'
    },
    validation: {
      processing: '抽出結果を検証中...',
      completed: '検証完了',
      failed: '検証に失敗しました',
      incomplete: '不完全なデータです',
      suggestions: '改善提案'
    }
  },

  settings: {
    title: '設定',
    profile: 'プロフィール',
    preferences: '環境設定',
    subscription: 'サブスクリプション',
    notifications: '通知設定',
    privacy: 'プライバシー',
    account: 'アカウント',
    
    profile: {
      basicInfo: '基本情報',
      fullName: '氏名',
      email: 'メールアドレス',
      phone: '電話番号',
      location: '所在地',
      currentPosition: '現在の職種',
      experience: '経験年数',
      skills: 'スキル',
      targetRole: '希望職種',
      targetSalary: '希望年収',
      preferredLocations: '希望勤務地',
      languages: '言語',
      education: '学歴',
      certifications: '資格'
    },
    
    preferences: {
      language: '表示言語',
      timezone: 'タイムゾーン',
      dateFormat: '日付形式',
      theme: 'テーマ',
      communicationStyle: 'コミュニケーションスタイル',
      feedbackType: 'フィードバックタイプ',
      promptLength: 'プロンプトの長さ',
      aiModelPreference: '優先AIモデル'
    },
    
    notifications: {
      email: 'メール通知',
      push: 'プッシュ通知',
      reminders: 'リマインダー',
      updates: 'アップデート通知',
      marketing: 'マーケティング情報'
    },
    
    subscription: {
      currentPlan: '現在のプラン',
      usage: '使用状況',
      billing: '請求情報',
      changePlan: 'プラン変更',
      cancelSubscription: 'サブスクリプション解約',
      renewalDate: '更新日',
      paymentMethod: '支払い方法'
    }
  },

  subscription: {
    plans: {
      basic: {
        name: 'ベーシック',
        price: '¥1,480/月',
        description: '基本的な就活支援機能',
        features: [
          '基本プロンプト集（25種類）',
          '簡易進捗管理（5社まで）',
          'メールサポート',
          '月次プロンプト更新'
        ]
      },
      standard: {
        name: 'スタンダード',
        price: '¥2,980/月',
        description: '包括的な就活支援',
        features: [
          '全プロンプト集（70種類以上）',
          '無制限の企業管理',
          'パーソナライゼーション機能',
          '週次プロンプト更新',
          'カスタムプロンプト作成支援',
          '成功事例・ベストプラクティス共有'
        ]
      },
      premium: {
        name: 'プレミアム',
        price: '¥5,980/月',
        description: '最高レベルのサポート',
        features: [
          '全機能利用可能',
          '個別カスタムプロンプト開発',
          '1対1キャリアコンサルティング（月1回）',
          '新AI対応の優先提供',
          '専門コンサルタントによる戦略相談',
          '無制限サポート'
        ]
      }
    },
    features: {
      promptGeneration: 'プロンプト生成',
      applicationManagement: '応募管理',
      aiIntegration: 'AI連携',
      analytics: '分析機能',
      support: 'サポート',
      customization: 'カスタマイズ'
    }
  },

  errors: {
    generic: '予期しないエラーが発生しました',
    network: 'ネットワークエラーが発生しました',
    authentication: '認証に失敗しました',
    authorization: 'アクセス権限がありません',
    validation: '入力内容に誤りがあります',
    notFound: '見つかりませんでした',
    serverError: 'サーバーエラーが発生しました',
    timeout: 'タイムアウトしました',
    quotaExceeded: '利用制限に達しました',
    aiServiceError: 'AIサービスでエラーが発生しました',
    promptGenerationFailed: 'プロンプト生成に失敗しました',
    dataExtractionFailed: 'データ抽出に失敗しました',
    fileUploadFailed: 'ファイルアップロードに失敗しました'
  },

  validation: {
    required: 'この項目は必須です',
    email: '正しいメールアドレスを入力してください',
    minLength: '{min}文字以上で入力してください',
    maxLength: '{max}文字以内で入力してください',
    numeric: '数値を入力してください',
    url: '正しいURLを入力してください',
    phone: '正しい電話番号を入力してください',
    date: '正しい日付を入力してください',
    futureDate: '未来の日付を入力してください',
    pastDate: '過去の日付を入力してください'
  },

  tooltips: {
    promptGeneration: 'あなたの状況に最適化されたプロンプトを生成します',
    contextAnalysis: 'あなたのコンテキストを分析して最適な支援を提供します',
    aiIntegration: 'Claude、ChatGPT、Geminiなどとシームレスに連携します',
    learningEngine: '使用履歴から継続的に最適化されます',
    dataExtraction: 'スクリーンショットから自動でデータを抽出します',
    progressTracking: '応募状況を一元管理して進捗を可視化します'
  },

  help: {
    gettingStarted: 'はじめに',
    userGuide: 'ユーザーガイド',
    faq: 'よくある質問',
    contactSupport: 'サポートに連絡',
    documentation: 'ドキュメント',
    tutorials: 'チュートリアル',
    changelog: '更新履歴',
    feedback: 'フィードバック'
  }
};

export type MessageKey = keyof typeof jaMessages;
export type Messages = typeof jaMessages;