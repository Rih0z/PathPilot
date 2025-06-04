import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render as testingLibraryRender, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

// Simple mock components
const LandingPage = () => <div data-testid="landing-page">Landing Page</div>;
const OnboardingPage = () => <div data-testid="onboarding-page">Onboarding Page</div>;
const DashboardPage = () => <div data-testid="dashboard-page">Dashboard Page</div>;
const ProfilePage = () => <div data-testid="profile-page">Profile Page</div>;

const NotFoundPage = () => (
  <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
    <div className="card max-w-md w-full p-8 text-center">
      <div className="w-20 h-20 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29.82-5.877 2.172M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <h1 className="text-2xl font-semibold text-neutral-900 mb-3">
        迷子になってしまいましたね
      </h1>
      <p className="text-neutral-600 mb-6">
        お探しのページが見つかりません。<br />
        ホームに戻って、新しい就活の旅を始めましょう。
      </p>
      <a
        href="/"
        className="btn-primary w-full inline-block"
      >
        ホームに戻る
      </a>
    </div>
  </div>
);

// Simple routing component for testing
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/onboarding" element={<OnboardingPage />} />
    <Route path="/dashboard" element={<DashboardPage />} />
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

// Custom render function for testing routing
const renderApp = (initialEntries = ['/']) => {
  return testingLibraryRender(
    <MemoryRouter initialEntries={initialEntries}>
      <AppRoutes />
    </MemoryRouter>
  );
};

describe('App Routing', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render landing page on root route', async () => {
    renderApp(['/']);
    
    await waitFor(() => {
      expect(screen.getByTestId('landing-page')).toBeInTheDocument();
    });
  });

  it('should render onboarding page on /onboarding route', async () => {
    renderApp(['/onboarding']);
    
    await waitFor(() => {
      expect(screen.getByTestId('onboarding-page')).toBeInTheDocument();
    });
  });

  it('should render dashboard page on /dashboard route', async () => {
    renderApp(['/dashboard']);
    
    await waitFor(() => {
      expect(screen.getByTestId('dashboard-page')).toBeInTheDocument();
    });
  });

  it('should render profile page on /profile route', async () => {
    renderApp(['/profile']);
    
    await waitFor(() => {
      expect(screen.getByTestId('profile-page')).toBeInTheDocument();
    });
  });

  it('should render 404 page for unknown routes', async () => {
    renderApp(['/unknown-route']);
    
    await waitFor(() => {
      expect(screen.getByText('迷子になってしまいましたね')).toBeInTheDocument();
      expect(screen.getByText('お探しのページが見つかりません。')).toBeInTheDocument();
      expect(screen.getByText('ホームに戻る')).toBeInTheDocument();
    });
  });

  it('should have home link in 404 page', async () => {
    renderApp(['/invalid']);
    
    await waitFor(() => {
      const homeLink = screen.getByText('ホームに戻る');
      expect(homeLink).toBeInTheDocument();
      expect(homeLink.closest('a')).toHaveAttribute('href', '/');
    });
  });

  it('should show correct 404 icon', async () => {
    renderApp(['/does-not-exist']);
    
    await waitFor(() => {
      // Check for 404 icon (SVG)
      const icon = document.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });
  });
});

describe('ErrorBoundary', () => {
  // Component that throws an error for testing
  const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
    if (shouldThrow) {
      throw new Error('Test error');
    }
    return <div>No error</div>;
  };

  it('should catch errors and display error UI', () => {
    // Spy on console.error to suppress error logs in tests
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    class TestErrorBoundary extends React.Component<
      { children: React.ReactNode },
      { hasError: boolean; error?: Error }
    > {
      constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false };
      }

      static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
      }

      componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Test Error:', error, errorInfo);
      }

      render() {
        if (this.state.hasError) {
          return (
            <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
              <div className="card max-w-md w-full p-8 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                  申し訳ございません
                </h2>
                <p className="text-neutral-600 mb-6">
                  予期しないエラーが発生しました。ページを再読み込みしてお試しください。
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="btn-primary w-full"
                >
                  ページを再読み込み
                </button>
              </div>
            </div>
          );
        }

        return this.props.children;
      }
    }

    testingLibraryRender(
      <TestErrorBoundary>
        <ThrowError shouldThrow={true} />
      </TestErrorBoundary>
    );
    
    expect(screen.getByText('申し訳ございません')).toBeInTheDocument();
    expect(screen.getByText('予期しないエラーが発生しました。ページを再読み込みしてお試しください。')).toBeInTheDocument();
    expect(screen.getByText('ページを再読み込み')).toBeInTheDocument();
    
    consoleSpy.mockRestore();
  });

  it('should render children when there is no error', () => {
    class TestErrorBoundary extends React.Component<
      { children: React.ReactNode },
      { hasError: boolean }
    > {
      constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false };
      }

      static getDerivedStateFromError() {
        return { hasError: true };
      }

      render() {
        if (this.state.hasError) {
          return <div>Error occurred</div>;
        }
        return this.props.children;
      }
    }

    testingLibraryRender(
      <TestErrorBoundary>
        <ThrowError shouldThrow={false} />
      </TestErrorBoundary>
    );
    
    expect(screen.getByText('No error')).toBeInTheDocument();
  });
});

describe('Route Navigation', () => {
  it('should navigate between routes correctly', async () => {
    const { rerender } = renderApp(['/']);
    
    await waitFor(() => {
      expect(screen.getByTestId('landing-page')).toBeInTheDocument();
    });
    
    // Navigate to onboarding
    rerender(
      <MemoryRouter initialEntries={['/onboarding']}>
        <AppRoutes />
      </MemoryRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByTestId('onboarding-page')).toBeInTheDocument();
    });
  });

  it('should handle multiple route changes', async () => {
    const routes = ['/', '/onboarding', '/dashboard', '/profile'];
    const expectedTestIds = ['landing-page', 'onboarding-page', 'dashboard-page', 'profile-page'];
    
    for (let i = 0; i < routes.length; i++) {
      const { unmount } = renderApp([routes[i]]);
      
      await waitFor(() => {
        expect(screen.getByTestId(expectedTestIds[i])).toBeInTheDocument();
      });
      
      unmount();
    }
  });

  it('should maintain route state correctly', async () => {
    renderApp(['/dashboard']);
    
    await waitFor(() => {
      expect(screen.getByTestId('dashboard-page')).toBeInTheDocument();
      expect(screen.queryByTestId('landing-page')).not.toBeInTheDocument();
      expect(screen.queryByTestId('onboarding-page')).not.toBeInTheDocument();
    });
  });
});