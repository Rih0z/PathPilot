// English message definitions
import type { Messages } from './ja';

export const enMessages: Messages = {
  common: {
    loading: 'Loading...',
    error: 'An error occurred',
    success: 'Success',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    close: 'Close',
    confirm: 'Confirm',
    generating: 'Generating...',
    processing: 'Processing...',
    copying: 'Copying...',
    copied: 'Copied',
    retry: 'Retry',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    finish: 'Finish',
    skip: 'Skip'
  },

  auth: {
    login: 'Login',
    logout: 'Logout',
    register: 'Sign Up',
    email: 'Email Address',
    password: 'Password',
    forgotPassword: 'Forgot Password?',
    resetPassword: 'Reset Password',
    loginWithGoogle: 'Sign in with Google',
    welcomeBack: 'Welcome Back',
    createAccount: 'Create Account',
    alreadyHaveAccount: 'Already have an account?',
    noAccount: "Don't have an account?",
    invalidCredentials: 'Invalid email or password',
    emailRequired: 'Email is required',
    passwordRequired: 'Password is required'
  },

  navigation: {
    dashboard: 'Dashboard',
    prompts: 'Prompts',
    applications: 'Applications',
    settings: 'Settings',
    profile: 'Profile',
    subscription: 'Subscription',
    help: 'Help',
    feedback: 'Feedback'
  },

  dashboard: {
    welcome: 'Welcome back, {name}',
    welcomeDefault: 'Welcome back',
    todayActions: "Today's Actions",
    progress: 'Progress',
    recentActivity: 'Recent Activity',
    quickStats: 'Quick Stats',
    noActionsToday: 'No actions for today',
    noRecentActivity: 'No recent activity',
    viewAll: 'View All',
    stats: {
      applications: 'Applications',
      interviews: 'Interviews',
      offers: 'Offers',
      successRate: 'Success Rate',
      responseRate: 'Response Rate',
      averageResponseTime: 'Avg Response Time',
      activeApplications: 'Active Applications',
      completedApplications: 'Completed Applications'
    },
    actions: {
      prepareInterview: 'Prepare Interview',
      followUp: 'Follow Up',
      applyToJob: 'Apply to Job',
      updateResume: 'Update Resume',
      researchCompany: 'Research Company',
      practiceInterview: 'Practice Interview'
    }
  },

  prompts: {
    title: 'Prompt Generation',
    generate: 'Generate Prompt',
    copy: 'Copy',
    generated: 'Generated Prompt',
    targetInfo: 'Target Information',
    usageInstructions: 'Usage Instructions',
    followUp: 'Follow-up Actions',
    recommendations: 'Recommended Prompts',
    history: 'Prompt History',
    categories: 'Categories',
    search: 'Search prompts',
    noResults: 'No prompts found',
    selectObjective: 'Please select an objective',
    enterTargetInfo: 'Please enter target information',
    generationFailed: 'Failed to generate prompt',
    copySuccess: 'Prompt copied to clipboard',
    
    categories: {
      resume: 'Resume & CV',
      coverLetter: 'Cover Letter & Motivation',
      interview: 'Interview Preparation',
      research: 'Company Research',
      networking: 'Networking',
      negotiation: 'Negotiation',
      followUp: 'Follow-up',
      portfolio: 'Portfolio'
    },
    
    objectives: {
      optimizeResume: 'Optimize Resume',
      writeMotivation: 'Write Motivation Letter',
      prepareInterview: 'Prepare Interview',
      researchCompany: 'Research Company',
      writeThankYou: 'Write Thank You Email',
      negotiateSalary: 'Negotiate Salary',
      improveLinkedIn: 'Optimize LinkedIn',
      createPortfolio: 'Create Portfolio'
    },

    templates: {
      basic: 'Basic',
      standard: 'Standard',
      premium: 'Premium',
      effectivenessScore: 'Effectiveness Score',
      usageCount: 'Usage Count',
      lastUpdated: 'Last Updated',
      preview: 'Preview'
    }
  },

  applications: {
    title: 'Application Management',
    add: 'Add New Application',
    edit: 'Edit Application',
    delete: 'Delete Application',
    view: 'View Details',
    company: 'Company',
    position: 'Position',
    salary: 'Salary',
    location: 'Location',
    appliedDate: 'Applied Date',
    status: 'Status',
    priority: 'Priority',
    notes: 'Notes',
    nextAction: 'Next Action',
    deadline: 'Deadline',
    contacts: 'Contacts',
    documents: 'Documents',
    timeline: 'Timeline',
    analysis: 'AI Analysis',
    
    status: {
      research: 'Research',
      applied: 'Applied',
      documentReview: 'Document Review',
      interview1: 'First Interview',
      interview2: 'Second Interview',
      interviewFinal: 'Final Interview',
      offer: 'Offer',
      rejected: 'Rejected',
      withdrawn: 'Withdrawn'
    },
    
    priority: {
      high: 'High',
      medium: 'Medium',
      low: 'Low'
    },
    
    actions: {
      scheduleInterview: 'Schedule Interview',
      prepareDocuments: 'Prepare Documents',
      sendFollowUp: 'Send Follow-up',
      updateStatus: 'Update Status',
      addNotes: 'Add Notes',
      setReminder: 'Set Reminder'
    },
    
    filters: {
      all: 'All',
      active: 'Active',
      pending: 'Pending',
      completed: 'Completed',
      byStatus: 'By Status',
      byPriority: 'By Priority',
      byDate: 'By Date'
    },
    
    empty: {
      title: 'No applications yet',
      description: 'Add your first application to get started',
      action: 'Add Application'
    }
  },

  extraction: {
    title: 'Data Extraction',
    uploadScreenshot: 'Upload Screenshot',
    generatePrompt: 'Generate Extraction Prompt',
    processResult: 'Process Result',
    importData: 'Import Data',
    extractionTypes: {
      jobPosting: 'Job Posting',
      companyInfo: 'Company Information',
      applicationStatus: 'Application Status',
      interview: 'Interview Information'
    },
    instructions: {
      step1: 'Take a screenshot of the job site',
      step2: 'Copy the generated prompt to Claude/ChatGPT',
      step3: 'Attach the screenshot and run AI',
      step4: 'Paste the result into PathPilot to import'
    },
    validation: {
      processing: 'Validating extraction result...',
      completed: 'Validation completed',
      failed: 'Validation failed',
      incomplete: 'Incomplete data',
      suggestions: 'Improvement suggestions'
    }
  },

  settings: {
    title: 'Settings',
    profile: 'Profile',
    preferences: 'Preferences',
    subscription: 'Subscription',
    notifications: 'Notifications',
    privacy: 'Privacy',
    account: 'Account',
    
    profile: {
      basicInfo: 'Basic Information',
      fullName: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      location: 'Location',
      currentPosition: 'Current Position',
      experience: 'Years of Experience',
      skills: 'Skills',
      targetRole: 'Target Role',
      targetSalary: 'Target Salary',
      preferredLocations: 'Preferred Locations',
      languages: 'Languages',
      education: 'Education',
      certifications: 'Certifications'
    },
    
    preferences: {
      language: 'Language',
      timezone: 'Timezone',
      dateFormat: 'Date Format',
      theme: 'Theme',
      communicationStyle: 'Communication Style',
      feedbackType: 'Feedback Type',
      promptLength: 'Prompt Length',
      aiModelPreference: 'Preferred AI Model'
    },
    
    notifications: {
      email: 'Email Notifications',
      push: 'Push Notifications',
      reminders: 'Reminders',
      updates: 'Update Notifications',
      marketing: 'Marketing Communications'
    },
    
    subscription: {
      currentPlan: 'Current Plan',
      usage: 'Usage',
      billing: 'Billing Information',
      changePlan: 'Change Plan',
      cancelSubscription: 'Cancel Subscription',
      renewalDate: 'Renewal Date',
      paymentMethod: 'Payment Method'
    }
  },

  subscription: {
    plans: {
      basic: {
        name: 'Basic',
        price: '$14.80/month',
        description: 'Essential job search tools',
        features: [
          'Basic prompt library (25 types)',
          'Simple progress tracking (up to 5 companies)',
          'Email support',
          'Monthly prompt updates'
        ]
      },
      standard: {
        name: 'Standard',
        price: '$29.80/month',
        description: 'Comprehensive job search support',
        features: [
          'Complete prompt library (70+ types)',
          'Unlimited company management',
          'Personalization features',
          'Weekly prompt updates',
          'Custom prompt creation support',
          'Success stories & best practices sharing'
        ]
      },
      premium: {
        name: 'Premium',
        price: '$59.80/month',
        description: 'Ultimate career support',
        features: [
          'All features available',
          'Individual custom prompt development',
          '1-on-1 career consultation (monthly)',
          'Priority access to new AI features',
          'Strategic consultation with expert consultants',
          'Unlimited support'
        ]
      }
    },
    features: {
      promptGeneration: 'Prompt Generation',
      applicationManagement: 'Application Management',
      aiIntegration: 'AI Integration',
      analytics: 'Analytics',
      support: 'Support',
      customization: 'Customization'
    }
  },

  errors: {
    generic: 'An unexpected error occurred',
    network: 'Network error occurred',
    authentication: 'Authentication failed',
    authorization: 'Access denied',
    validation: 'Invalid input',
    notFound: 'Not found',
    serverError: 'Server error occurred',
    timeout: 'Request timed out',
    quotaExceeded: 'Usage quota exceeded',
    aiServiceError: 'AI service error',
    promptGenerationFailed: 'Prompt generation failed',
    dataExtractionFailed: 'Data extraction failed',
    fileUploadFailed: 'File upload failed'
  },

  validation: {
    required: 'This field is required',
    email: 'Please enter a valid email address',
    minLength: 'Minimum {min} characters required',
    maxLength: 'Maximum {max} characters allowed',
    numeric: 'Please enter a number',
    url: 'Please enter a valid URL',
    phone: 'Please enter a valid phone number',
    date: 'Please enter a valid date',
    futureDate: 'Please enter a future date',
    pastDate: 'Please enter a past date'
  },

  tooltips: {
    promptGeneration: 'Generate prompts optimized for your situation',
    contextAnalysis: 'Analyze your context to provide optimal support',
    aiIntegration: 'Seamlessly integrate with Claude, ChatGPT, Gemini, and more',
    learningEngine: 'Continuously optimized from usage history',
    dataExtraction: 'Automatically extract data from screenshots',
    progressTracking: 'Centrally manage application status and visualize progress'
  },

  help: {
    gettingStarted: 'Getting Started',
    userGuide: 'User Guide',
    faq: 'FAQ',
    contactSupport: 'Contact Support',
    documentation: 'Documentation',
    tutorials: 'Tutorials',
    changelog: 'Changelog',
    feedback: 'Feedback'
  }
};