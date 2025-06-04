import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '../utils';
import userEvent from '@testing-library/user-event';
import ProfilePage from '@/pages/ProfilePage';

describe('ProfilePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render profile header with user information', () => {
    render(<ProfilePage />);
    
    expect(screen.getByText('田中 美咲')).toBeInTheDocument();
    expect(screen.getByText('大学4年生 → ソフトウェアエンジニア')).toBeInTheDocument();
    expect(screen.getByText('tanaka.misaki@example.com')).toBeInTheDocument();
    expect(screen.getByText('東京')).toBeInTheDocument();
    expect(screen.getByText('開始: 2024年1月')).toBeInTheDocument();
  });

  it('should display quick stats in header', () => {
    render(<ProfilePage />);
    
    expect(screen.getByText('850')).toBeInTheDocument(); // growth score
    expect(screen.getByText('成長スコア')).toBeInTheDocument();
    expect(screen.getByText('23')).toBeInTheDocument(); // activity days
    expect(screen.getByText('活動日数')).toBeInTheDocument();
  });

  it('should render editable profile section', () => {
    render(<ProfilePage />);
    
    expect(screen.getByText('プロフィール情報')).toBeInTheDocument();
    expect(screen.getByText('編集')).toBeInTheDocument();
    
    // Check basic info display
    expect(screen.getByText('基本情報')).toBeInTheDocument();
    expect(screen.getByText('スキル・経験')).toBeInTheDocument();
  });

  it('should display user skills as tags', () => {
    render(<ProfilePage />);
    
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('Git')).toBeInTheDocument();
  });

  it('should enter edit mode when edit button is clicked', async () => {
    const user = userEvent.setup();
    render(<ProfilePage />);
    
    const editButton = screen.getByText('編集');
    await user.click(editButton);
    
    // Should switch to edit mode
    expect(screen.getByText('キャンセル')).toBeInTheDocument();
    expect(screen.getByDisplayValue('田中 美咲')).toBeInTheDocument();
    expect(screen.getByDisplayValue('ソフトウェアエンジニア')).toBeInTheDocument();
  });

  it('should save profile changes', async () => {
    const user = userEvent.setup();
    render(<ProfilePage />);
    
    // Enter edit mode
    await user.click(screen.getByText('編集'));
    
    // Modify name
    const nameInput = screen.getByDisplayValue('田中 美咲');
    await user.clear(nameInput);
    await user.type(nameInput, '田中 花子');
    
    // Save changes
    const saveButton = screen.getByText('保存');
    await user.click(saveButton);
    
    // Should exit edit mode and show updated name
    await waitFor(() => {
      expect(screen.getByText('田中 花子')).toBeInTheDocument();
      expect(screen.getByText('編集')).toBeInTheDocument();
    });
  });

  it('should cancel edit mode', async () => {
    const user = userEvent.setup();
    render(<ProfilePage />);
    
    // Enter edit mode
    await user.click(screen.getByText('編集'));
    
    // Modify name
    const nameInput = screen.getByDisplayValue('田中 美咲');
    await user.clear(nameInput);
    await user.type(nameInput, '田中 花子');
    
    // Cancel changes
    const cancelButton = screen.getByText('キャンセル');
    await user.click(cancelButton);
    
    // Should exit edit mode without saving changes
    await waitFor(() => {
      expect(screen.getByText('田中 美咲')).toBeInTheDocument(); // Original name
      expect(screen.getByText('編集')).toBeInTheDocument();
    });
  });

  it('should render goals section with target information', () => {
    render(<ProfilePage />);
    
    expect(screen.getByText('目標設定')).toBeInTheDocument();
    expect(screen.getByText('550万円')).toBeInTheDocument(); // target salary
    expect(screen.getByText('目標年収')).toBeInTheDocument();
    expect(screen.getByText('希望勤務地')).toBeInTheDocument();
    expect(screen.getByText('ハイブリッド')).toBeInTheDocument(); // work style
    expect(screen.getByText('3ヶ月以内')).toBeInTheDocument(); // timeline
  });

  it('should display wellness section with emotional state', () => {
    render(<ProfilePage />);
    
    expect(screen.getByText('コンディション')).toBeInTheDocument();
    expect(screen.getByText('ストレスレベル')).toBeInTheDocument();
    expect(screen.getByText('モチベーション')).toBeInTheDocument();
    expect(screen.getByText('自信レベル')).toBeInTheDocument();
    
    // Check stress level (0.4 = low)
    expect(screen.getByText('低')).toBeInTheDocument();
    
    // Check motivation level (high)
    expect(screen.getByText('高')).toBeInTheDocument();
    
    // Check confidence level (80%)
    expect(screen.getByText('80%')).toBeInTheDocument();
  });

  it('should render subscription section', () => {
    render(<ProfilePage />);
    
    expect(screen.getByText('利用状況')).toBeInTheDocument();
    expect(screen.getByText('フリープラン')).toBeInTheDocument();
    
    // Check usage limits
    expect(screen.getByText('3/5')).toBeInTheDocument(); // daily prompts
    expect(screen.getByText('2/3')).toBeInTheDocument(); // daily recommendations
    expect(screen.getByText('7/10')).toBeInTheDocument(); // monthly applications
    expect(screen.getByText('12/20')).toBeInTheDocument(); // ai analysis credits
  });

  it('should show premium upgrade prompt for free users', () => {
    render(<ProfilePage />);
    
    expect(screen.getByText('プレミアムで更なる成長を')).toBeInTheDocument();
    expect(screen.getByText('無制限のAI分析、高度な成功パターン解析、専属メンターサポート')).toBeInTheDocument();
    expect(screen.getByText('アップグレード')).toBeInTheDocument();
  });

  it('should handle upgrade button click', async () => {
    const user = userEvent.setup();
    render(<ProfilePage />);
    
    const upgradeButton = screen.getByText('アップグレード');
    await user.click(upgradeButton);
    
    // Should not throw error (upgrade functionality would be implemented)
  });

  it('should display navigation bar', () => {
    render(<ProfilePage />);
    
    expect(screen.getByText('PathPilot')).toBeInTheDocument();
    
    // Check for navigation icons
    const settingsButton = screen.getByRole('button', { name: /settings/i });
    const bellButton = screen.getByRole('button', { name: /bell/i });
    
    expect(settingsButton).toBeInTheDocument();
    expect(bellButton).toBeInTheDocument();
  });

  it('should show progress bars for usage limits', () => {
    render(<ProfilePage />);
    
    // Check that progress bars are rendered (they have specific structure)
    const progressBars = document.querySelectorAll('.w-full.bg-white.rounded-full.h-2');
    expect(progressBars.length).toBeGreaterThan(0);
  });

  it('should handle skills editing in textarea', async () => {
    const user = userEvent.setup();
    render(<ProfilePage />);
    
    // Enter edit mode
    await user.click(screen.getByText('編集'));
    
    // Find skills textarea
    const skillsTextarea = screen.getByDisplayValue('JavaScript, React, Python, Git');
    await user.clear(skillsTextarea);
    await user.type(skillsTextarea, 'JavaScript, React, TypeScript, Node.js');
    
    // Save changes
    await user.click(screen.getByText('保存'));
    
    // Should show updated skills
    await waitFor(() => {
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('Node.js')).toBeInTheDocument();
    });
  });

  it('should display correct wellness indicators with progress bars', () => {
    render(<ProfilePage />);
    
    // Check for wellness progress bars
    const wellnessSection = screen.getByText('コンディション').closest('div');
    const progressBars = wellnessSection?.querySelectorAll('.h-2.rounded-full.transition-all.duration-500');
    
    expect(progressBars?.length).toBeGreaterThan(0);
  });

  it('should show last updated date for emotional state', () => {
    render(<ProfilePage />);
    
    expect(screen.getByText(/最終更新:/)).toBeInTheDocument();
  });

  it('should handle navigation button clicks', async () => {
    const user = userEvent.setup();
    render(<ProfilePage />);
    
    // Test settings button
    const settingsButton = screen.getByRole('button', { name: /settings/i });
    await user.click(settingsButton);
    // Should not throw error
    
    // Test notification button
    const bellButton = screen.getByRole('button', { name: /bell/i });
    await user.click(bellButton);
    // Should not throw error
  });

  it('should display user avatar with initial', () => {
    render(<ProfilePage />);
    
    // Should show first character of name
    expect(screen.getByText('田')).toBeInTheDocument();
  });

  it('should show correct work style label', () => {
    render(<ProfilePage />);
    
    // hybrid should be displayed as ハイブリッド
    expect(screen.getByText('ハイブリッド')).toBeInTheDocument();
  });

  it('should validate required fields in edit mode', async () => {
    const user = userEvent.setup();
    render(<ProfilePage />);
    
    // Enter edit mode
    await user.click(screen.getByText('編集'));
    
    // Clear required field
    const nameInput = screen.getByDisplayValue('田中 美咲');
    await user.clear(nameInput);
    
    // Save button should still be clickable (validation happens on save)
    const saveButton = screen.getByText('保存');
    expect(saveButton).not.toBeDisabled();
  });

  it('should format salary correctly', () => {
    render(<ProfilePage />);
    
    // 5500000 should be formatted as 550万円
    expect(screen.getByText('550万円')).toBeInTheDocument();
  });
});