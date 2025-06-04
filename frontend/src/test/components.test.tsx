import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render as testingLibraryRender, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Import components
import LandingPage from '@/pages/LandingPage';
import OnboardingPage from '@/pages/OnboardingPage';
import DashboardPage from '@/pages/DashboardPage';
import ProfilePage from '@/pages/ProfilePage';

// Mock framer-motion more thoroughly
vi.mock('framer-motion', () => ({
  motion: new Proxy({}, {
    get(target, prop) {
      return ({ children, ...props }: any) => {
        const { animate, initial, transition, variants, whileHover, whileTap, ...rest } = props;
        return React.createElement(prop as string, rest, children);
      };
    }
  }),
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useAnimation: () => ({
    start: vi.fn(),
    stop: vi.fn(),
    set: vi.fn(),
  }),
}));

// Helper to render components with router
const renderWithRouter = (component: React.ReactElement, route = '/') => {
  return testingLibraryRender(
    <MemoryRouter initialEntries={[route]}>
      {component}
    </MemoryRouter>
  );
};

describe('LandingPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render without crashing', () => {
    renderWithRouter(<LandingPage />);
    
    // Basic smoke test - just check it renders
    expect(document.body).toBeInTheDocument();
  });

  it('should display main heading', () => {
    renderWithRouter(<LandingPage />);
    
    expect(screen.getByText('あなたの就活に')).toBeInTheDocument();
  });

  it('should have CTA buttons', () => {
    renderWithRouter(<LandingPage />);
    
    expect(screen.getByText('無料で希望体験を始める')).toBeInTheDocument();
  });
});

describe('OnboardingPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render without crashing', () => {
    renderWithRouter(<OnboardingPage />);
    
    expect(document.body).toBeInTheDocument();
  });

  it('should display welcome message', () => {
    renderWithRouter(<OnboardingPage />);
    
    expect(screen.getByText('🎉 PathPilotへようこそ！')).toBeInTheDocument();
  });

  it('should show progress indicator', () => {
    renderWithRouter(<OnboardingPage />);
    
    expect(screen.getByText('1 / 7')).toBeInTheDocument();
  });
});

describe('DashboardPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render without crashing', () => {
    renderWithRouter(<DashboardPage />);
    
    expect(document.body).toBeInTheDocument();
  });

  it('should display user greeting', () => {
    renderWithRouter(<DashboardPage />);
    
    expect(screen.getByText(/こんにちは、田中 美咲さん/)).toBeInTheDocument();
  });

  it('should show navigation', () => {
    renderWithRouter(<DashboardPage />);
    
    expect(screen.getByText('PathPilot')).toBeInTheDocument();
  });
});

describe('ProfilePage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render without crashing', () => {
    renderWithRouter(<ProfilePage />);
    
    expect(document.body).toBeInTheDocument();
  });

  it('should display user name', () => {
    renderWithRouter(<ProfilePage />);
    
    expect(screen.getByText('田中 美咲')).toBeInTheDocument();
  });

  it('should show profile sections', () => {
    renderWithRouter(<ProfilePage />);
    
    expect(screen.getByText('プロフィール情報')).toBeInTheDocument();
    expect(screen.getByText('目標設定')).toBeInTheDocument();
  });
});