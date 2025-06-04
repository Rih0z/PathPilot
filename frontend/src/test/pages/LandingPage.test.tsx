import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '../utils';
import LandingPage from '@/pages/LandingPage';

// Mock window.location for navigation tests
const mockLocation = {
  href: '',
  assign: vi.fn(),
  reload: vi.fn(),
};
Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

describe('LandingPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render hero section with main headline', () => {
    render(<LandingPage />);
    
    expect(screen.getByText('あなたの就活に')).toBeInTheDocument();
    expect(screen.getByText('希望の光を')).toBeInTheDocument();
  });

  it('should display social proof badge', () => {
    render(<LandingPage />);
    
    expect(screen.getByText('2万人以上が就活成功を実現')).toBeInTheDocument();
  });

  it('should show key statistics', () => {
    render(<LandingPage />);
    
    expect(screen.getByText('3.2ヶ月')).toBeInTheDocument();
    expect(screen.getByText('94.5%')).toBeInTheDocument();
    expect(screen.getByText('98%')).toBeInTheDocument();
  });

  it('should render testimonial carousel', () => {
    render(<LandingPage />);
    
    // Check for testimonial content
    expect(screen.getByText(/田中 美咲さん|佐藤 健太さん|山田 あやさん/)).toBeInTheDocument();
  });

  it('should have CTA buttons', () => {
    render(<LandingPage />);
    
    const primaryCTA = screen.getByText('無料で希望体験を始める');
    expect(primaryCTA).toBeInTheDocument();
    expect(primaryCTA.closest('a')).toHaveAttribute('href', '/onboarding');
    
    expect(screen.getByText('2分で分かる紹介動画')).toBeInTheDocument();
  });

  it('should render features section', () => {
    render(<LandingPage />);
    
    expect(screen.getByText('なぜPathPilotで')).toBeInTheDocument();
    expect(screen.getByText('希望が見える')).toBeInTheDocument();
    expect(screen.getByText('のか？')).toBeInTheDocument();
    
    // Check for feature titles
    expect(screen.getByText('パーソナライズドAI')).toBeInTheDocument();
    expect(screen.getByText('希望体験生成')).toBeInTheDocument();
    expect(screen.getByText('成功パターン分析')).toBeInTheDocument();
    expect(screen.getByText('ステップバイステップ')).toBeInTheDocument();
  });

  it('should render social proof statistics', () => {
    render(<LandingPage />);
    
    expect(screen.getByText('20,000+')).toBeInTheDocument();
    expect(screen.getByText('累計利用者数')).toBeInTheDocument();
    expect(screen.getByText('内定成功率')).toBeInTheDocument();
    expect(screen.getByText('平均内定期間')).toBeInTheDocument();
  });

  it('should render final CTA section', () => {
    render(<LandingPage />);
    
    expect(screen.getByText('今すぐ始めて、')).toBeInTheDocument();
    expect(screen.getByText('明日から変わる就活を')).toBeInTheDocument();
    
    // Should have final CTA button
    const finalCTA = screen.getAllByText('無料で希望体験を始める');
    expect(finalCTA.length).toBeGreaterThan(1); // Multiple CTAs on the page
  });

  it('should handle testimonial carousel interaction', async () => {
    render(<LandingPage />);
    
    // Find carousel indicators (dots)
    const indicators = screen.getAllByRole('button').filter(button => 
      button.className.includes('rounded-full') && button.className.includes('w-3')
    );
    
    if (indicators.length > 1) {
      fireEvent.click(indicators[1]);
      // Should not throw any errors
    }
  });

  it('should display benefit callouts for features', () => {
    render(<LandingPage />);
    
    expect(screen.getByText('迷いがなくなり、確信を持って行動できる')).toBeInTheDocument();
    expect(screen.getByText('不安が希望に変わり、モチベーションが続く')).toBeInTheDocument();
    expect(screen.getByText('何をすべきかが明確になり、迷わず行動できる')).toBeInTheDocument();
    expect(screen.getByText('圧倒される感覚がなくなり、着実に前進できる')).toBeInTheDocument();
  });

  it('should have proper accessibility attributes', () => {
    render(<LandingPage />);
    
    // Check for proper heading hierarchy
    const h1Elements = screen.getAllByRole('heading', { level: 1 });
    expect(h1Elements.length).toBeGreaterThan(0);
    
    const h2Elements = screen.getAllByRole('heading', { level: 2 });
    expect(h2Elements.length).toBeGreaterThan(0);
  });

  it('should handle video button click', () => {
    render(<LandingPage />);
    
    const videoButton = screen.getByText('2分で分かる紹介動画');
    fireEvent.click(videoButton);
    
    // Should not throw any errors (actual video functionality would be implemented later)
  });

  it('should display encouraging messages', () => {
    render(<LandingPage />);
    
    expect(screen.getByText(/AIがあなただけの成功パターンを発見し/)).toBeInTheDocument();
    expect(screen.getByText(/具体的な希望体験をお届けします/)).toBeInTheDocument();
  });

  it('should show daily user count in final CTA', () => {
    render(<LandingPage />);
    
    expect(screen.getByText(/今日 \d+人 が新しい希望を見つけました/)).toBeInTheDocument();
  });

  it('should have responsive layout classes', () => {
    render(<LandingPage />);
    
    // Check for responsive grid classes
    const container = screen.getByText('あなたの就活に').closest('div');
    expect(container?.className).toMatch(/grid|flex|lg:|md:/);
  });
});