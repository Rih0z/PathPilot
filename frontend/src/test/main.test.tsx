import { describe, it, expect, vi } from 'vitest';

// Mock ReactDOM.createRoot
const mockRender = vi.fn();
const mockCreateRoot = vi.fn(() => ({
  render: mockRender,
}));

vi.mock('react-dom/client', () => ({
  createRoot: mockCreateRoot,
}));

// Mock document.getElementById
Object.defineProperty(document, 'getElementById', {
  value: vi.fn(() => ({
    id: 'root',
  })),
  configurable: true,
});

describe('main.tsx', () => {
  it('should call createRoot and render', async () => {
    // Import main to trigger the side effects
    await import('@/main');
    
    expect(mockCreateRoot).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'root' })
    );
    expect(mockRender).toHaveBeenCalled();
  });
});