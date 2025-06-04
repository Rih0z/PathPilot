// Seed data script for PathPilot
// This creates initial prompt templates and test data

import type { PromptTemplate } from './src/shared/types';

export const seedPromptTemplates: PromptTemplate[] = [
  {
    id: 'template-interview-prep-001',
    name: '面接準備プロンプト',
    goal: 'interview_preparation',
    base_prompt: 'あなたは{{target_industry}}業界の{{target_role}}職の面接準備をサポートするキャリアコーチです。{{experience_years}}年の経験を持つ{{current_role}}として働く候補者に対して、以下の観点でアドバイスしてください。',
    variables: ['target_industry', 'target_role', 'experience_years', 'current_role'],
    conditions: {
      personality_traits: ['analytical', 'strategic'],
      experience_level_min: 0,
      experience_level_max: 10
    },
    effectiveness_score: 0.85,
    usage_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'template-resume-review-001',
    name: '履歴書レビュープロンプト',
    goal: 'resume_review',
    base_prompt: '{{target_industry}}業界の{{target_role}}職に応募する履歴書をレビューしてください。特に{{skills}}のスキルを持つ候補者として、どのような点を強調すべきかアドバイスしてください。',
    variables: ['target_industry', 'target_role', 'skills'],
    conditions: {
      personality_traits: ['detail-oriented', 'creative'],
      experience_level_min: 0,
      experience_level_max: 15
    },
    effectiveness_score: 0.82,
    usage_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'template-career-strategy-001',
    name: 'キャリア戦略プロンプト',
    goal: 'career_planning',
    base_prompt: '現在{{current_role}}として{{experience_years}}年の経験がある方が、{{target_role}}を目指すための戦略を立ててください。{{target_industry}}業界の特性を考慮し、実践的なアクションプランを提案してください。',
    variables: ['current_role', 'experience_years', 'target_role', 'target_industry'],
    conditions: {
      personality_traits: ['ambitious', 'strategic'],
      experience_level_min: 1,
      experience_level_max: 20
    },
    effectiveness_score: 0.88,
    usage_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'template-motivation-letter-001',
    name: '志望動機作成プロンプト',
    goal: 'motivation_letter',
    base_prompt: '{{company_name}}の{{target_role}}職に応募する志望動機を作成してください。{{skills}}の経験と{{company_values}}という企業価値観を結びつけて、説得力のある内容にしてください。',
    variables: ['company_name', 'target_role', 'skills', 'company_values'],
    conditions: {
      personality_traits: ['creative', 'analytical'],
      experience_level_min: 0,
      experience_level_max: 10
    },
    effectiveness_score: 0.80,
    usage_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'template-skill-gap-analysis-001',
    name: 'スキルギャップ分析プロンプト',
    goal: 'skill_assessment',
    base_prompt: '{{current_role}}から{{target_role}}へキャリアチェンジするために必要なスキルギャップを分析してください。現在のスキル：{{current_skills}}。{{target_industry}}業界で求められるスキルとの差分を明確にしてください。',
    variables: ['current_role', 'target_role', 'current_skills', 'target_industry'],
    conditions: {
      personality_traits: ['analytical', 'growth-oriented'],
      experience_level_min: 0,
      experience_level_max: 25
    },
    effectiveness_score: 0.87,
    usage_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Success pattern data
export const seedSuccessPatterns = [
  {
    user_profile: {
      experience_years: 3,
      current_role: 'Frontend Developer',
      target_role: 'Full Stack Developer',
      skills: ['React', 'TypeScript', 'Node.js'],
      personality: 'analytical'
    },
    journey: {
      start_date: '2024-01-01',
      end_date: '2024-06-01',
      milestones: [
        { date: '2024-02-01', event: 'Started learning backend technologies' },
        { date: '2024-03-15', event: 'Completed first full-stack project' },
        { date: '2024-05-01', event: 'Received job offer' }
      ]
    },
    outcome: {
      success: true,
      company_type: 'Tech Startup',
      salary_increase: 25,
      satisfaction_score: 9
    }
  },
  {
    user_profile: {
      experience_years: 1,
      current_role: 'Student',
      target_role: 'Software Engineer',
      skills: ['Java', 'Python', 'Git'],
      personality: 'creative'
    },
    journey: {
      start_date: '2024-03-01',
      end_date: '2024-08-01',
      milestones: [
        { date: '2024-03-15', event: 'Started internship search' },
        { date: '2024-05-01', event: 'Completed coding bootcamp' },
        { date: '2024-07-15', event: 'Accepted entry-level position' }
      ]
    },
    outcome: {
      success: true,
      company_type: 'Large Corporation',
      salary_increase: 0,
      satisfaction_score: 8
    }
  }
];

console.log('Seed data generated successfully');
console.log(`- ${seedPromptTemplates.length} prompt templates`);
console.log(`- ${seedSuccessPatterns.length} success patterns`);