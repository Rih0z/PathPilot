import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '../utils';
import userEvent from '@testing-library/user-event';
import DashboardPage from '@/pages/DashboardPage';

// Mock Date for consistent testing
const mockDate = new Date('2024-01-15T12:00:00Z');
vi.setSystemTime(mockDate);

describe('DashboardPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render dashboard header with greeting', () => {
    render(<DashboardPage />);
    
    expect(screen.getByText(/こんにちは、田中 美咲さん/)).toBeInTheDocument();
    expect(screen.getByText(/今日も一歩ずつ、理想の未来に近づいています|あなたの努力は必ず実を結びます|新しい可能性が待っています|今日が人生を変える日になるかもしれません/)).toBeInTheDocument();
  });

  it('should display user condition percentage', () => {
    render(<DashboardPage />);
    
    // Mock user has stress_level: 0.6, so condition should be 40%
    expect(screen.getByText('40%')).toBeInTheDocument();
    expect(screen.getByText('コンディション')).toBeInTheDocument();
  });

  it('should render navigation bar', () => {
    render(<DashboardPage />);
    
    expect(screen.getByText('PathPilot')).toBeInTheDocument();
    
    // Check for navigation icons
    const refreshButton = screen.getByRole('button', { name: /refresh/i });
    const bellButton = screen.getByRole('button', { name: /bell/i });
    const userButton = screen.getByRole('button', { name: /user/i });
    
    expect(refreshButton).toBeInTheDocument();
    expect(bellButton).toBeInTheDocument();
    expect(userButton).toBeInTheDocument();
  });

  it('should display quick stats cards', () => {
    render(<DashboardPage />);
    
    expect(screen.getByText('目標達成率')).toBeInTheDocument();
    expect(screen.getByText('76%')).toBeInTheDocument();
    
    expect(screen.getByText('活動日数')).toBeInTheDocument();
    expect(screen.getByText('23日')).toBeInTheDocument();
    
    expect(screen.getByText('成長スコア')).toBeInTheDocument();
    expect(screen.getByText('850')).toBeInTheDocument();
    
    expect(screen.getByText('モチベーション')).toBeInTheDocument();
    expect(screen.getByText('中')).toBeInTheDocument(); // medium = 中
  });

  it('should render hope experience card', () => {
    render(<DashboardPage />);
    
    expect(screen.getByText('あなたの希望体験')).toBeInTheDocument();
    expect(screen.getByText('3ヶ月後のあなた')).toBeInTheDocument();
    expect(screen.getByText(/3ヶ月後、某大手IT企業から年収550万円の内定を獲得し/)).toBeInTheDocument();
  });

  it('should display success probability and similarity', () => {
    render(<DashboardPage />);
    
    expect(screen.getByText('成功確率')).toBeInTheDocument();
    expect(screen.getByText('85%')).toBeInTheDocument();
    
    expect(screen.getByText('類似成功例')).toBeInTheDocument();
    expect(screen.getByText('92%')).toBeInTheDocument(); // similarity_score * 100
    expect(screen.getByText('あなたとの類似度')).toBeInTheDocument();
  });

  it('should handle hope experience expansion', async () => {
    const user = userEvent.setup();
    render(<DashboardPage />);
    
    // Find and click the more options button
    const moreButton = screen.getByRole('button', { name: /more-vertical/i });
    await user.click(moreButton);
    
    // Should show expanded content
    await waitFor(() => {
      expect(screen.getByText('詳細な根拠データ')).toBeInTheDocument();
    });
    
    expect(screen.getByText('類似点:')).toBeInTheDocument();
    expect(screen.getByText('同じ情報工学部出身')).toBeInTheDocument();
    expect(screen.getByText('JavaScriptとReactのスキル保有')).toBeInTheDocument();
  });

  it('should render next action card', () => {
    render(<DashboardPage />);
    
    expect(screen.getByText('今日のアクション')).toBeInTheDocument();
    expect(screen.getByText('高優先度')).toBeInTheDocument();
    expect(screen.getByText('GitHubプロフィールの充実とポートフォリオリポジトリの整理')).toBeInTheDocument();
    
    expect(screen.getByText('所要時間: 2時間')).toBeInTheDocument();
    expect(screen.getByText(/期待効果: 技術力の証明と採用担当者への印象向上/)).toBeInTheDocument();
  });

  it('should handle action completion', async () => {
    const user = userEvent.setup();
    render(<DashboardPage />);
    
    // Find the action checkbox
    const checkbox = screen.getByRole('button', { name: /^$/ }); // Empty aria-label for checkbox
    await user.click(checkbox);
    
    // Should show completion state
    await waitFor(() => {
      expect(screen.getByText('素晴らしい！次のアクションが準備されました')).toBeInTheDocument();
    });
    
    // Action description should be struck through
    const actionDescription = screen.getByText('GitHubプロフィールの充実とポートフォリオリポジトリの整理');
    expect(actionDescription).toHaveClass('line-through');
  });

  it('should handle refresh button click', async () => {
    const user = userEvent.setup();
    render(<DashboardPage />);
    
    const refreshButton = screen.getByRole('button', { name: /refresh/i });
    
    // Click refresh
    await user.click(refreshButton);
    
    // Should show loading state
    expect(refreshButton.querySelector('svg')).toHaveClass('animate-spin');
    
    // Wait for loading to finish
    await waitFor(() => {
      expect(refreshButton.querySelector('svg')).not.toHaveClass('animate-spin');
    }, { timeout: 3000 });
  });

  it('should display evidence details when expanded', async () => {
    const user = userEvent.setup();
    render(<DashboardPage />);
    
    const moreButton = screen.getByRole('button', { name: /more-vertical/i });
    await user.click(moreButton);
    
    await waitFor(() => {
      expect(screen.getByText(/127人中108人が目標達成/)).toBeInTheDocument();
    });
  });

  it('should have proper time-based greeting', () => {
    render(<DashboardPage />);
    
    // With mocked time of 12:00, should be "こんにちは"
    expect(screen.getByText(/こんにちは、田中 美咲さん/)).toBeInTheDocument();
  });

  it('should render detailed success path button', () => {
    render(<DashboardPage />);
    
    const detailButton = screen.getByText('詳細な成功パスを確認');
    expect(detailButton).toBeInTheDocument();
    expect(detailButton.closest('button')).toHaveClass('w-full');
  });

  it('should display correct motivational message', () => {
    render(<DashboardPage />);
    
    // Should have one of the motivational messages
    const motivationalMessages = [
      '今日も一歩ずつ、理想の未来に近づいています',
      'あなたの努力は必ず実を結びます',
      '新しい可能性が待っています',
      '今日が人生を変える日になるかもしれません'
    ];
    
    const hasMotivationalMessage = motivationalMessages.some(message => 
      screen.queryByText(message) !== null
    );
    expect(hasMotivationalMessage).toBe(true);
  });

  it('should handle navigation button clicks', async () => {
    const user = userEvent.setup();
    render(<DashboardPage />);
    
    // Test bell notification button
    const bellButton = screen.getByRole('button', { name: /bell/i });
    await user.click(bellButton);
    // Should not throw error
    
    // Test user profile button
    const userButton = screen.getByRole('button', { name: /user/i });
    await user.click(userButton);
    // Should not throw error
  });

  it('should show correct priority styling for high priority action', () => {
    render(<DashboardPage />);
    
    const priorityBadge = screen.getByText('高優先度');
    expect(priorityBadge).toHaveClass('border-red-200', 'bg-red-50', 'text-red-700');
  });

  it('should display stats with correct values', () => {
    render(<DashboardPage />);
    
    // Check that all stats are displayed with expected format
    expect(screen.getByText('+12%')).toBeInTheDocument(); // change for goal achievement
    expect(screen.getByText('継続中')).toBeInTheDocument(); // activity days change
    expect(screen.getByText('+45')).toBeInTheDocument(); // growth score change
    expect(screen.getByText('安定')).toBeInTheDocument(); // motivation change
  });

  it('should have responsive design classes', () => {
    render(<DashboardPage />);
    
    // Check for responsive grid classes in stats section
    const statsContainer = screen.getByText('目標達成率').closest('.grid');
    expect(statsContainer).toHaveClass('grid-cols-2', 'lg:grid-cols-4');
  });
});