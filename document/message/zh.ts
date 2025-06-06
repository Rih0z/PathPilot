// Chinese (Simplified) message definitions
import type { Messages } from './ja';

export const zhMessages: Messages = {
  common: {
    loading: '加载中...',
    error: '发生错误',
    success: '成功',
    cancel: '取消',
    save: '保存',
    delete: '删除',
    edit: '编辑',
    add: '添加',
    close: '关闭',
    confirm: '确认',
    generating: '生成中...',
    processing: '处理中...',
    copying: '复制中...',
    copied: '已复制',
    retry: '重试',
    back: '返回',
    next: '下一步',
    previous: '上一步',
    finish: '完成',
    skip: '跳过'
  },

  auth: {
    login: '登录',
    logout: '退出登录',
    register: '注册',
    email: '邮箱地址',
    password: '密码',
    forgotPassword: '忘记密码？',
    resetPassword: '重置密码',
    loginWithGoogle: '使用Google登录',
    welcomeBack: '欢迎回来',
    createAccount: '创建账户',
    alreadyHaveAccount: '已有账户？',
    noAccount: '没有账户？',
    invalidCredentials: '邮箱或密码不正确',
    emailRequired: '请输入邮箱',
    passwordRequired: '请输入密码'
  },

  navigation: {
    dashboard: '仪表板',
    prompts: '提示词',
    applications: '申请管理',
    settings: '设置',
    profile: '个人资料',
    subscription: '订阅',
    help: '帮助',
    feedback: '反馈'
  },

  dashboard: {
    welcome: '欢迎回来，{name}',
    welcomeDefault: '欢迎回来',
    todayActions: '今日任务',
    progress: '进度',
    recentActivity: '最近活动',
    quickStats: '快速统计',
    noActionsToday: '今日无任务',
    noRecentActivity: '无最近活动',
    viewAll: '查看全部',
    stats: {
      applications: '申请数',
      interviews: '面试数',
      offers: '录用数',
      successRate: '成功率',
      responseRate: '回复率',
      averageResponseTime: '平均回复时间',
      activeApplications: '进行中的申请',
      completedApplications: '已完成的申请'
    },
    actions: {
      prepareInterview: '面试准备',
      followUp: '跟进',
      applyToJob: '申请职位',
      updateResume: '更新简历',
      researchCompany: '研究公司',
      practiceInterview: '面试练习'
    }
  },

  prompts: {
    title: '提示词生成',
    generate: '生成提示词',
    copy: '复制',
    generated: '生成的提示词',
    targetInfo: '目标信息',
    usageInstructions: '使用说明',
    followUp: '后续操作',
    recommendations: '推荐提示词',
    history: '提示词历史',
    categories: '分类',
    search: '搜索提示词',
    noResults: '未找到相关提示词',
    selectObjective: '请选择目标',
    enterTargetInfo: '请输入目标信息',
    generationFailed: '提示词生成失败',
    copySuccess: '提示词已复制到剪贴板',
    
    categories: {
      resume: '简历',
      coverLetter: '求职信',
      interview: '面试准备',
      research: '公司研究',
      networking: '网络建设',
      negotiation: '薪资谈判',
      followUp: '跟进',
      portfolio: '作品集'
    },
    
    objectives: {
      optimizeResume: '优化简历',
      writeMotivation: '撰写求职动机',
      prepareInterview: '面试准备',
      researchCompany: '研究公司',
      writeThankYou: '撰写感谢邮件',
      negotiateSalary: '薪资谈判',
      improveLinkedIn: '优化LinkedIn',
      createPortfolio: '创建作品集'
    },

    templates: {
      basic: '基础',
      standard: '标准',
      premium: '高级',
      effectivenessScore: '效果评分',
      usageCount: '使用次数',
      lastUpdated: '最后更新',
      preview: '预览'
    }
  },

  applications: {
    title: '申请管理',
    add: '添加新申请',
    edit: '编辑申请',
    delete: '删除申请',
    view: '查看详情',
    company: '公司',
    position: '职位',
    salary: '薪资',
    location: '地点',
    appliedDate: '申请日期',
    status: '状态',
    priority: '优先级',
    notes: '备注',
    nextAction: '下一步操作',
    deadline: '截止日期',
    contacts: '联系人',
    documents: '文档',
    timeline: '时间线',
    analysis: 'AI分析',
    
    status: {
      research: '研究',
      applied: '已申请',
      documentReview: '文档审查',
      interview1: '一面',
      interview2: '二面',
      interviewFinal: '终面',
      offer: '录用',
      rejected: '拒绝',
      withdrawn: '撤回'
    },
    
    priority: {
      high: '高',
      medium: '中',
      low: '低'
    },
    
    actions: {
      scheduleInterview: '安排面试',
      prepareDocuments: '准备文档',
      sendFollowUp: '发送跟进',
      updateStatus: '更新状态',
      addNotes: '添加备注',
      setReminder: '设置提醒'
    },
    
    filters: {
      all: '全部',
      active: '进行中',
      pending: '待处理',
      completed: '已完成',
      byStatus: '按状态',
      byPriority: '按优先级',
      byDate: '按日期'
    },
    
    empty: {
      title: '暂无申请',
      description: '添加您的第一个申请开始使用',
      action: '添加申请'
    }
  },

  extraction: {
    title: '数据提取',
    uploadScreenshot: '上传截图',
    generatePrompt: '生成提取提示词',
    processResult: '处理结果',
    importData: '导入数据',
    extractionTypes: {
      jobPosting: '职位发布',
      companyInfo: '公司信息',
      applicationStatus: '申请状态',
      interview: '面试信息'
    },
    instructions: {
      step1: '截取招聘网站的屏幕截图',
      step2: '将生成的提示词复制到Claude/ChatGPT',
      step3: '附加截图并运行AI',
      step4: '将结果粘贴到PathPilot进行导入'
    },
    validation: {
      processing: '验证提取结果中...',
      completed: '验证完成',
      failed: '验证失败',
      incomplete: '数据不完整',
      suggestions: '改进建议'
    }
  },

  settings: {
    title: '设置',
    profile: '个人资料',
    preferences: '偏好设置',
    subscription: '订阅',
    notifications: '通知',
    privacy: '隐私',
    account: '账户',
    
    profile: {
      basicInfo: '基本信息',
      fullName: '姓名',
      email: '邮箱地址',
      phone: '电话号码',
      location: '位置',
      currentPosition: '当前职位',
      experience: '工作年限',
      skills: '技能',
      targetRole: '目标职位',
      targetSalary: '目标薪资',
      preferredLocations: '期望工作地点',
      languages: '语言',
      education: '教育背景',
      certifications: '证书'
    },
    
    preferences: {
      language: '语言',
      timezone: '时区',
      dateFormat: '日期格式',
      theme: '主题',
      communicationStyle: '沟通风格',
      feedbackType: '反馈类型',
      promptLength: '提示词长度',
      aiModelPreference: '首选AI模型'
    },
    
    notifications: {
      email: '邮件通知',
      push: '推送通知',
      reminders: '提醒',
      updates: '更新通知',
      marketing: '营销信息'
    },
    
    subscription: {
      currentPlan: '当前套餐',
      usage: '使用情况',
      billing: '账单信息',
      changePlan: '更换套餐',
      cancelSubscription: '取消订阅',
      renewalDate: '续费日期',
      paymentMethod: '支付方式'
    }
  },

  subscription: {
    plans: {
      basic: {
        name: '基础版',
        price: '¥148/月',
        description: '基本求职工具',
        features: [
          '基础提示词库（25种）',
          '简单进度跟踪（最多5家公司）',
          '邮件支持',
          '月度提示词更新'
        ]
      },
      standard: {
        name: '标准版',
        price: '¥298/月',
        description: '全面求职支持',
        features: [
          '完整提示词库（70+种）',
          '无限公司管理',
          '个性化功能',
          '周度提示词更新',
          '自定义提示词创建支持',
          '成功案例及最佳实践分享'
        ]
      },
      premium: {
        name: '高级版',
        price: '¥598/月',
        description: '终极职业支持',
        features: [
          '所有功能可用',
          '个人定制提示词开发',
          '一对一职业咨询（月度）',
          '新AI功能优先体验',
          '专业顾问战略咨询',
          '无限支持'
        ]
      }
    },
    features: {
      promptGeneration: '提示词生成',
      applicationManagement: '申请管理',
      aiIntegration: 'AI集成',
      analytics: '分析',
      support: '支持',
      customization: '定制化'
    }
  },

  errors: {
    generic: '发生了意外错误',
    network: '网络错误',
    authentication: '认证失败',
    authorization: '访问被拒绝',
    validation: '输入无效',
    notFound: '未找到',
    serverError: '服务器错误',
    timeout: '请求超时',
    quotaExceeded: '使用配额已超限',
    aiServiceError: 'AI服务错误',
    promptGenerationFailed: '提示词生成失败',
    dataExtractionFailed: '数据提取失败',
    fileUploadFailed: '文件上传失败'
  },

  validation: {
    required: '此字段为必填项',
    email: '请输入有效的邮箱地址',
    minLength: '最少需要{min}个字符',
    maxLength: '最多允许{max}个字符',
    numeric: '请输入数字',
    url: '请输入有效的URL',
    phone: '请输入有效的电话号码',
    date: '请输入有效的日期',
    futureDate: '请输入将来的日期',
    pastDate: '请输入过去的日期'
  },

  tooltips: {
    promptGeneration: '生成针对您情况优化的提示词',
    contextAnalysis: '分析您的情况提供最佳支持',
    aiIntegration: '与Claude、ChatGPT、Gemini等无缝集成',
    learningEngine: '从使用历史中持续优化',
    dataExtraction: '从截图中自动提取数据',
    progressTracking: '集中管理申请状态并可视化进度'
  },

  help: {
    gettingStarted: '开始使用',
    userGuide: '用户指南',
    faq: '常见问题',
    contactSupport: '联系支持',
    documentation: '文档',
    tutorials: '教程',
    changelog: '更新日志',
    feedback: '反馈'
  }
};