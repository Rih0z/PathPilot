import React, { createContext, useContext, useState, useEffect } from 'react'

export interface UserData {
  basicInfo: {
    name: string
    age: number
    education: string
    currentStatus: string
  }
  jobSearchInfo: {
    targetIndustries: string[]
    targetPositions: string[]
    preferredSalary: string
    preferredLocation: string
    startDate: string
  }
  experience: {
    workHistory: Array<{
      company: string
      position: string
      duration: string
      achievements: string[]
    }>
    skills: string[]
    certifications: string[]
    projects: Array<{
      name: string
      description: string
      impact: string
    }>
  }
  currentActivity: {
    applicationsSubmitted: number
    interviewsScheduled: number
    offers: number
    platforms: string[]
    lastActivity: string
  }
  challenges: {
    mainConcerns: string[]
    blockers: string[]
    support: string[]
  }
  additionalInfo: {
    screenshots: string[]
    documents: string[]
    notes: string
  }
  analysis?: {
    strengths: string[]
    improvementAreas: string[]
    recommendations: string[]
    matchingScore: number
    nextActions: string[]
  }
  importedAt?: string
}

interface UserDataContextType {
  userData: UserData | null
  setUserData: (data: UserData) => void
  clearUserData: () => void
  hasUserData: boolean
  updateUserData: (updates: Partial<UserData>) => void
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined)

export const useUserData = () => {
  const context = useContext(UserDataContext)
  if (context === undefined) {
    throw new Error('useUserData must be used within a UserDataProvider')
  }
  return context
}

export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserDataState] = useState<UserData | null>(null)

  // ローカルストレージからデータを読み込み
  useEffect(() => {
    const savedData = localStorage.getItem('pathpilot-user-data')
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setUserDataState(parsed)
      } catch (error) {
        console.error('Failed to parse saved user data:', error)
        localStorage.removeItem('pathpilot-user-data')
      }
    }
  }, [])

  const setUserData = (data: UserData) => {
    const dataWithTimestamp = {
      ...data,
      importedAt: new Date().toISOString()
    }
    setUserDataState(dataWithTimestamp)
    localStorage.setItem('pathpilot-user-data', JSON.stringify(dataWithTimestamp))
  }

  const updateUserData = (updates: Partial<UserData>) => {
    if (userData) {
      const updatedData = { ...userData, ...updates }
      setUserData(updatedData)
    }
  }

  const clearUserData = () => {
    setUserDataState(null)
    localStorage.removeItem('pathpilot-user-data')
  }

  const hasUserData = userData !== null

  const value: UserDataContextType = {
    userData,
    setUserData,
    clearUserData,
    hasUserData,
    updateUserData
  }

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  )
}