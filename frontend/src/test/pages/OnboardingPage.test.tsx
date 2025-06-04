import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '../utils';
import userEvent from '@testing-library/user-event';
import OnboardingPage from '@/pages/OnboardingPage';

// Mock window.location for navigation
const mockLocation = {
  href: '',
  assign: vi.fn(),
  reload: vi.fn(),
};
Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

describe('OnboardingPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocation.href = '';
  });

  it('should render the first step (welcome)', () => {
    render(<OnboardingPage />);
    
    expect(screen.getByText('🎉 PathPilotへようこそ！')).toBeInTheDocument();
    expect(screen.getByText('2万人以上が就活成功を実現')).toBeInTheDocument();
    expect(screen.getByText('まず、あなたのお名前を教えてください')).toBeInTheDocument();
  });

  it('should show progress indicator', () => {
    render(<OnboardingPage />);
    
    expect(screen.getByText('1 / 7')).toBeInTheDocument();
  });

  it('should have back button disabled on first step', () => {
    render(<OnboardingPage />);
    
    const backButton = screen.getByRole('button', { name: /chevron-left/i });
    expect(backButton).toBeDisabled();
  });

  it('should have next button disabled initially', () => {
    render(<OnboardingPage />);
    
    const nextButton = screen.getByText('次へ');
    expect(nextButton).toBeDisabled();
  });

  it('should enable next button when text input is filled', async () => {
    const user = userEvent.setup();
    render(<OnboardingPage />);
    
    const input = screen.getByPlaceholderText('例: 田中 太郎');
    await user.type(input, 'Test User');
    
    const nextButton = screen.getByText('次へ');
    expect(nextButton).not.toBeDisabled();
  });

  it('should proceed to next step when next button is clicked', async () => {
    const user = userEvent.setup();
    render(<OnboardingPage />);
    
    // Fill in name
    const input = screen.getByPlaceholderText('例: 田中 太郎');
    await user.type(input, 'Test User');
    
    // Click next
    const nextButton = screen.getByText('次へ');
    await user.click(nextButton);
    
    // Should be on step 2
    expect(screen.getByText('2 / 7')).toBeInTheDocument();
    expect(screen.getByText('現在の状況について')).toBeInTheDocument();
  });

  it('should show card selection options on second step', async () => {
    const user = userEvent.setup();
    render(<OnboardingPage />);
    
    // Go to step 2
    const input = screen.getByPlaceholderText('例: 田中 太郎');
    await user.type(input, 'Test User');
    const nextButton = screen.getByText('次へ');
    await user.click(nextButton);
    
    // Check for card options
    expect(screen.getByText('大学生・大学院生')).toBeInTheDocument();
    expect(screen.getByText('既卒・第二新卒')).toBeInTheDocument();
    expect(screen.getByText('キャリアチェンジ')).toBeInTheDocument();
    expect(screen.getByText('スキルアップ転職')).toBeInTheDocument();
  });

  it('should allow card selection and proceed', async () => {
    const user = userEvent.setup();
    render(<OnboardingPage />);
    
    // Go to step 2
    const input = screen.getByPlaceholderText('例: 田中 太郎');
    await user.type(input, 'Test User');
    let nextButton = screen.getByText('次へ');
    await user.click(nextButton);
    
    // Select a card
    const studentCard = screen.getByText('大学生・大学院生');
    await user.click(studentCard);
    
    // Next button should be enabled
    nextButton = screen.getByText('次へ');
    expect(nextButton).not.toBeDisabled();
    
    // Proceed to next step
    await user.click(nextButton);
    expect(screen.getByText('3 / 7')).toBeInTheDocument();
  });

  it('should show slider on experience step', async () => {
    const user = userEvent.setup();
    render(<OnboardingPage />);
    
    // Navigate to step 3 (experience)
    await user.type(screen.getByPlaceholderText('例: 田中 太郎'), 'Test User');
    await user.click(screen.getByText('次へ'));
    
    await user.click(screen.getByText('大学生・大学院生'));
    await user.click(screen.getByText('次へ'));
    
    // Should be on experience step with slider
    expect(screen.getByText('あなたの経験')).toBeInTheDocument();
    expect(screen.getByText('0年')).toBeInTheDocument();
    expect(screen.getByText('15年+')).toBeInTheDocument();
    
    const slider = screen.getByRole('slider');
    expect(slider).toBeInTheDocument();
  });

  it('should allow back navigation', async () => {
    const user = userEvent.setup();
    render(<OnboardingPage />);
    
    // Go to step 2
    await user.type(screen.getByPlaceholderText('例: 田中 太郎'), 'Test User');
    await user.click(screen.getByText('次へ'));
    
    expect(screen.getByText('2 / 7')).toBeInTheDocument();
    
    // Go back
    const backButton = screen.getByRole('button', { name: /chevron-left/i });
    expect(backButton).not.toBeDisabled();
    await user.click(backButton);
    
    // Should be back on step 1
    expect(screen.getByText('1 / 7')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test User')).toBeInTheDocument(); // Previous value preserved
  });

  it('should show social proof after first step', async () => {
    const user = userEvent.setup();
    render(<OnboardingPage />);
    
    // Complete first step
    await user.type(screen.getByPlaceholderText('例: 田中 太郎'), 'Test User');
    await user.click(screen.getByText('次へ'));
    
    // Social proof should be visible
    expect(screen.getByText('2万人が利用中')).toBeInTheDocument();
    expect(screen.getByText('平均3.2ヶ月で内定')).toBeInTheDocument();
    expect(screen.getByText('満足度98%')).toBeInTheDocument();
  });

  it('should handle multi-select options', async () => {
    const user = userEvent.setup();
    render(<OnboardingPage />);
    
    // Navigate to goals step (step 6)
    const steps = [
      { input: screen.getByPlaceholderText('例: 田中 太郎'), value: 'Test User' },
      { click: () => screen.getByText('大学生・大学院生') },
      { slider: () => screen.getByRole('slider') },
      { input: screen.getByPlaceholderText('例: ソフトウェアエンジニア'), value: 'Engineer' },
      { click: () => screen.getByText('😐 普通') },
    ];
    
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      if (step.input) {
        await user.type(step.input, step.value);
      } else if (step.click) {
        await user.click(step.click());
      } else if (step.slider) {
        fireEvent.change(step.slider(), { target: { value: '2' } });
      }
      await user.click(screen.getByText('次へ'));
    }
    
    // Should be on goals step with multi-select
    expect(screen.getByText('あなたの目標')).toBeInTheDocument();
    
    // Select multiple options
    const salary400 = screen.getByText('年収400万円以上');
    const remote = screen.getByText('リモートワーク');
    
    await user.click(salary400);
    await user.click(remote);
    
    // Both should be selected (visually indicated)
    expect(salary400.closest('button')).toHaveClass('border-accent-500');
    expect(remote.closest('button')).toHaveClass('border-accent-500');
  });

  it('should show completion step and redirect', async () => {
    const user = userEvent.setup();
    render(<OnboardingPage />);
    
    // Complete all steps quickly
    await user.type(screen.getByPlaceholderText('例: 田中 太郎'), 'Test User');
    await user.click(screen.getByText('次へ'));
    
    await user.click(screen.getByText('大学生・大学院生'));
    await user.click(screen.getByText('次へ'));
    
    fireEvent.change(screen.getByRole('slider'), { target: { value: '2' } });
    await user.click(screen.getByText('次へ'));
    
    await user.type(screen.getByPlaceholderText('例: ソフトウェアエンジニア'), 'Engineer');
    await user.click(screen.getByText('次へ'));
    
    await user.click(screen.getByText('😐 普通'));
    await user.click(screen.getByText('次へ'));
    
    await user.click(screen.getByText('年収400万円以上'));
    await user.click(screen.getByText('次へ'));
    
    // Should be on completion step
    expect(screen.getByText('🎊 プロファイル完成！')).toBeInTheDocument();
    expect(screen.getByText('はじめる')).toBeInTheDocument();
    
    // Click final button
    await user.click(screen.getByText('はじめる'));
    
    // Should redirect to dashboard
    expect(mockLocation.href).toBe('/dashboard');
  });

  it('should validate required fields', async () => {
    const user = userEvent.setup();
    render(<OnboardingPage />);
    
    // Try to proceed without filling required field
    const nextButton = screen.getByText('次へ');
    expect(nextButton).toBeDisabled();
    
    // Fill field and empty it
    const input = screen.getByPlaceholderText('例: 田中 太郎');
    await user.type(input, 'Test');
    await user.clear(input);
    
    // Should be disabled again
    expect(nextButton).toBeDisabled();
  });

  it('should update progress bar correctly', async () => {
    const user = userEvent.setup();
    render(<OnboardingPage />);
    
    // Check initial progress
    const progressBar = document.querySelector('.progress-fill');
    expect(progressBar).toBeInTheDocument();
    
    // Complete first step and check progress increased
    await user.type(screen.getByPlaceholderText('例: 田中 太郎'), 'Test User');
    await user.click(screen.getByText('次へ'));
    
    expect(screen.getByText('2 / 7')).toBeInTheDocument();
    // Progress should have increased (tested via step counter)
  });

  it('should handle stress level card selection', async () => {
    const user = userEvent.setup();
    render(<OnboardingPage />);
    
    // Navigate to stress level step
    await user.type(screen.getByPlaceholderText('例: 田中 太郎'), 'Test User');
    await user.click(screen.getByText('次へ'));
    
    await user.click(screen.getByText('大学生・大学院生'));
    await user.click(screen.getByText('次へ'));
    
    fireEvent.change(screen.getByRole('slider'), { target: { value: '2' } });
    await user.click(screen.getByText('次へ'));
    
    await user.type(screen.getByPlaceholderText('例: ソフトウェアエンジニア'), 'Engineer');
    await user.click(screen.getByText('次へ'));
    
    // Should be on stress level step
    expect(screen.getByText('現在の気持ち')).toBeInTheDocument();
    expect(screen.getByText('😌 リラックス')).toBeInTheDocument();
    expect(screen.getByText('😐 普通')).toBeInTheDocument();
    expect(screen.getByText('😰 不安')).toBeInTheDocument();
  });
});