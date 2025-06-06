// Korean message definitions
import type { Messages } from './ja';

export const koMessages: Messages = {
  common: {
    loading: '로딩 중...',
    error: '오류가 발생했습니다',
    success: '성공했습니다',
    cancel: '취소',
    save: '저장',
    delete: '삭제',
    edit: '편집',
    add: '추가',
    close: '닫기',
    confirm: '확인',
    generating: '생성 중...',
    processing: '처리 중...',
    copying: '복사 중...',
    copied: '복사됨',
    retry: '다시 시도',
    back: '뒤로',
    next: '다음',
    previous: '이전',
    finish: '완료',
    skip: '건너뛰기'
  },

  auth: {
    login: '로그인',
    logout: '로그아웃',
    register: '회원가입',
    email: '이메일 주소',
    password: '비밀번호',
    forgotPassword: '비밀번호를 잊으셨나요?',
    resetPassword: '비밀번호 재설정',
    loginWithGoogle: 'Google로 로그인',
    welcomeBack: '다시 오신 것을 환영합니다',
    createAccount: '계정 만들기',
    alreadyHaveAccount: '이미 계정이 있으신가요?',
    noAccount: '계정이 없으신가요?',
    invalidCredentials: '이메일 또는 비밀번호가 올바르지 않습니다',
    emailRequired: '이메일을 입력해주세요',
    passwordRequired: '비밀번호를 입력해주세요'
  },

  navigation: {
    dashboard: '대시보드',
    prompts: '프롬프트',
    applications: '지원 관리',
    settings: '설정',
    profile: '프로필',
    subscription: '구독',
    help: '도움말',
    feedback: '피드백'
  },

  dashboard: {
    welcome: '환영합니다, {name}님',
    welcomeDefault: '환영합니다',
    todayActions: '오늘의 할 일',
    progress: '진행 상황',
    recentActivity: '최근 활동',
    quickStats: '요약 통계',
    noActionsToday: '오늘 할 일이 없습니다',
    noRecentActivity: '최근 활동이 없습니다',
    viewAll: '모두 보기',
    stats: {
      applications: '지원 수',
      interviews: '면접 수',
      offers: '합격 수',
      successRate: '성공률',
      responseRate: '응답률',
      averageResponseTime: '평균 응답 시간',
      activeApplications: '진행 중인 지원',
      completedApplications: '완료된 지원'
    },
    actions: {
      prepareInterview: '면접 준비',
      followUp: '후속 조치',
      applyToJob: '구직 지원',
      updateResume: '이력서 업데이트',
      researchCompany: '회사 조사',
      practiceInterview: '면접 연습'
    }
  },

  prompts: {
    title: '프롬프트 생성',
    generate: '프롬프트 생성',
    copy: '복사',
    generated: '생성된 프롬프트',
    targetInfo: '타겟 정보',
    usageInstructions: '사용 방법',
    followUp: '후속 작업',
    recommendations: '추천 프롬프트',
    history: '프롬프트 기록',
    categories: '카테고리',
    search: '프롬프트 검색',
    noResults: '해당하는 프롬프트를 찾을 수 없습니다',
    selectObjective: '목표를 선택해주세요',
    enterTargetInfo: '타겟 정보를 입력해주세요',
    generationFailed: '프롬프트 생성에 실패했습니다',
    copySuccess: '프롬프트가 클립보드에 복사되었습니다',
    
    categories: {
      resume: '이력서 & 경력기술서',
      coverLetter: '자기소개서 & 동기',
      interview: '면접 준비',
      research: '회사 조사',
      networking: '네트워킹',
      negotiation: '협상',
      followUp: '후속 조치',
      portfolio: '포트폴리오'
    },
    
    objectives: {
      optimizeResume: '이력서 최적화',
      writeMotivation: '지원 동기 작성',
      prepareInterview: '면접 준비',
      researchCompany: '회사 조사',
      writeThankYou: '감사 이메일 작성',
      negotiateSalary: '연봉 협상',
      improveLinkedIn: 'LinkedIn 최적화',
      createPortfolio: '포트폴리오 작성'
    },

    templates: {
      basic: '기본',
      standard: '표준',
      premium: '프리미엄',
      effectivenessScore: '효과 점수',
      usageCount: '사용 횟수',
      lastUpdated: '마지막 업데이트',
      preview: '미리보기'
    }
  },

  applications: {
    title: '지원 관리',
    add: '새 지원 추가',
    edit: '지원 편집',
    delete: '지원 삭제',
    view: '세부 정보 보기',
    company: '회사',
    position: '직책',
    salary: '급여',
    location: '위치',
    appliedDate: '지원 날짜',
    status: '상태',
    priority: '우선순위',
    notes: '메모',
    nextAction: '다음 작업',
    deadline: '마감일',
    contacts: '연락처',
    documents: '문서',
    timeline: '타임라인',
    analysis: 'AI 분석',
    
    status: {
      research: '조사',
      applied: '지원함',
      documentReview: '서류 검토',
      interview1: '1차 면접',
      interview2: '2차 면접',
      interviewFinal: '최종 면접',
      offer: '합격',
      rejected: '불합격',
      withdrawn: '철회'
    },
    
    priority: {
      high: '높음',
      medium: '보통',
      low: '낮음'
    },
    
    actions: {
      scheduleInterview: '면접 일정 잡기',
      prepareDocuments: '문서 준비',
      sendFollowUp: '후속 조치 보내기',
      updateStatus: '상태 업데이트',
      addNotes: '메모 추가',
      setReminder: '리마인더 설정'
    },
    
    filters: {
      all: '전체',
      active: '진행 중',
      pending: '대기 중',
      completed: '완료',
      byStatus: '상태별',
      byPriority: '우선순위별',
      byDate: '날짜별'
    },
    
    empty: {
      title: '아직 지원이 없습니다',
      description: '첫 번째 지원을 추가하여 시작하세요',
      action: '지원 추가'
    }
  },

  extraction: {
    title: '데이터 추출',
    uploadScreenshot: '스크린샷 업로드',
    generatePrompt: '추출 프롬프트 생성',
    processResult: '결과 처리',
    importData: '데이터 가져오기',
    extractionTypes: {
      jobPosting: '채용 공고',
      companyInfo: '회사 정보',
      applicationStatus: '지원 상태',
      interview: '면접 정보'
    },
    instructions: {
      step1: '채용 사이트의 스크린샷 촬영',
      step2: '생성된 프롬프트를 Claude/ChatGPT에 복사',
      step3: '스크린샷을 첨부하고 AI 실행',
      step4: '결과를 PathPilot에 붙여넣어 가져오기'
    },
    validation: {
      processing: '추출 결과 검증 중...',
      completed: '검증 완료',
      failed: '검증 실패',
      incomplete: '불완전한 데이터',
      suggestions: '개선 제안'
    }
  },

  settings: {
    title: '설정',
    profile: '프로필',
    preferences: '환경설정',
    subscription: '구독',
    notifications: '알림',
    privacy: '개인정보',
    account: '계정',
    
    profile: {
      basicInfo: '기본 정보',
      fullName: '이름',
      email: '이메일 주소',
      phone: '전화번호',
      location: '위치',
      currentPosition: '현재 직책',
      experience: '경력 연수',
      skills: '기술',
      targetRole: '희망 직책',
      targetSalary: '희망 급여',
      preferredLocations: '희망 근무지',
      languages: '언어',
      education: '학력',
      certifications: '자격증'
    },
    
    preferences: {
      language: '언어',
      timezone: '시간대',
      dateFormat: '날짜 형식',
      theme: '테마',
      communicationStyle: '커뮤니케이션 스타일',
      feedbackType: '피드백 유형',
      promptLength: '프롬프트 길이',
      aiModelPreference: '선호 AI 모델'
    },
    
    notifications: {
      email: '이메일 알림',
      push: '푸시 알림',
      reminders: '리마인더',
      updates: '업데이트 알림',
      marketing: '마케팅 커뮤니케이션'
    },
    
    subscription: {
      currentPlan: '현재 플랜',
      usage: '사용량',
      billing: '결제 정보',
      changePlan: '플랜 변경',
      cancelSubscription: '구독 취소',
      renewalDate: '갱신일',
      paymentMethod: '결제 방법'
    }
  },

  subscription: {
    plans: {
      basic: {
        name: '기본',
        price: '₩14,800/월',
        description: '기본적인 구직 도구',
        features: [
          '기본 프롬프트 라이브러리 (25종)',
          '간단한 진행 추적 (최대 5개 회사)',
          '이메일 지원',
          '월간 프롬프트 업데이트'
        ]
      },
      standard: {
        name: '표준',
        price: '₩29,800/월',
        description: '포괄적인 구직 지원',
        features: [
          '완전한 프롬프트 라이브러리 (70종 이상)',
          '무제한 회사 관리',
          '개인화 기능',
          '주간 프롬프트 업데이트',
          '맞춤 프롬프트 제작 지원',
          '성공 사례 및 모범 사례 공유'
        ]
      },
      premium: {
        name: '프리미엄',
        price: '₩59,800/월',
        description: '최고 수준의 경력 지원',
        features: [
          '모든 기능 이용 가능',
          '개별 맞춤 프롬프트 개발',
          '1:1 경력 상담 (월 1회)',
          '신규 AI 기능 우선 제공',
          '전문 컨설턴트와의 전략 상담',
          '무제한 지원'
        ]
      }
    },
    features: {
      promptGeneration: '프롬프트 생성',
      applicationManagement: '지원 관리',
      aiIntegration: 'AI 통합',
      analytics: '분석',
      support: '지원',
      customization: '맞춤화'
    }
  },

  errors: {
    generic: '예기치 않은 오류가 발생했습니다',
    network: '네트워크 오류가 발생했습니다',
    authentication: '인증에 실패했습니다',
    authorization: '액세스가 거부되었습니다',
    validation: '잘못된 입력입니다',
    notFound: '찾을 수 없습니다',
    serverError: '서버 오류가 발생했습니다',
    timeout: '요청 시간이 초과되었습니다',
    quotaExceeded: '사용 할당량을 초과했습니다',
    aiServiceError: 'AI 서비스 오류',
    promptGenerationFailed: '프롬프트 생성에 실패했습니다',
    dataExtractionFailed: '데이터 추출에 실패했습니다',
    fileUploadFailed: '파일 업로드에 실패했습니다'
  },

  validation: {
    required: '이 필드는 필수입니다',
    email: '유효한 이메일 주소를 입력해주세요',
    minLength: '최소 {min}자 이상 입력해주세요',
    maxLength: '최대 {max}자까지 입력 가능합니다',
    numeric: '숫자를 입력해주세요',
    url: '유효한 URL을 입력해주세요',
    phone: '유효한 전화번호를 입력해주세요',
    date: '유효한 날짜를 입력해주세요',
    futureDate: '미래 날짜를 입력해주세요',
    pastDate: '과거 날짜를 입력해주세요'
  },

  tooltips: {
    promptGeneration: '상황에 최적화된 프롬프트를 생성합니다',
    contextAnalysis: '컨텍스트를 분석하여 최적의 지원을 제공합니다',
    aiIntegration: 'Claude, ChatGPT, Gemini 등과 완벽하게 통합됩니다',
    learningEngine: '사용 기록을 통해 지속적으로 최적화됩니다',
    dataExtraction: '스크린샷에서 자동으로 데이터를 추출합니다',
    progressTracking: '지원 상태를 중앙에서 관리하고 진행 상황을 시각화합니다'
  },

  help: {
    gettingStarted: '시작하기',
    userGuide: '사용자 가이드',
    faq: 'FAQ',
    contactSupport: '지원 연락',
    documentation: '문서',
    tutorials: '튜토리얼',
    changelog: '변경 내역',
    feedback: '피드백'
  }
};