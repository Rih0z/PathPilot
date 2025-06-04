import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  cn,
  colorPsychology,
  psychologyUtils,
  responsiveUtils,
  animationUtils,
  validationUtils,
  apiUtils,
  dateUtils,
  storageUtils
} from '@/utils';

describe('cn utility function', () => {
  it('should combine class names correctly', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('should handle conditional classes', () => {
    expect(cn('base', true && 'conditional', false && 'ignored')).toBe('base conditional');
  });

  it('should merge Tailwind classes correctly', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
  });
});

describe('colorPsychology utilities', () => {
  it('should return correct emotional colors', () => {
    expect(colorPsychology.getEmotionalColor('hope')).toBe('text-hope');
    expect(colorPsychology.getEmotionalColor('trust')).toBe('text-trust');
    expect(colorPsychology.getEmotionalColor('unknown')).toBe('text-neutral-600');
  });

  it('should return correct background colors', () => {
    expect(colorPsychology.getBackgroundColor('positive')).toBe('bg-gradient-to-r from-success-50 to-hope/10');
    expect(colorPsychology.getBackgroundColor('neutral')).toBe('bg-neutral-50');
    expect(colorPsychology.getBackgroundColor('negative')).toBe('bg-red-50');
  });

  it('should return correct border colors', () => {
    expect(colorPsychology.getBorderColor('active')).toBe('border-primary-500');
    expect(colorPsychology.getBorderColor('error')).toBe('border-red-500');
  });
});

describe('psychologyUtils', () => {
  it('should calculate progress weight correctly', () => {
    // Math.pow(0.5, 0.8) * 100 = 57.43
    expect(psychologyUtils.calculateProgressWeight(5, 10)).toBeCloseTo(57.43, 1);
    // Math.pow(0.1, 0.8) * 100 = 15.85
    expect(psychologyUtils.calculateProgressWeight(1, 10)).toBeCloseTo(15.85, 1);
    expect(psychologyUtils.calculateProgressWeight(10, 10)).toBe(100);
  });

  it('should generate social proof messages', () => {
    expect(psychologyUtils.getSocialProofMessage(15000)).toBe('15K+人が既に利用中');
    expect(psychologyUtils.getSocialProofMessage(5000)).toBe('5000+人が既に利用中'); // > 1000 so gets +
    expect(psychologyUtils.getSocialProofMessage(500)).toBe('500人が既に利用中');
  });

  it('should return commitment levels', () => {
    expect(psychologyUtils.getCommitmentLevel(0)).toBe('この情報を教えてください');
    expect(psychologyUtils.getCommitmentLevel(2)).toBe('あなたの目標を設定しましょう');
    expect(psychologyUtils.getCommitmentLevel(10)).toBe('あなた専用のプランを作成します');
  });

  it('should return reciprocity messages', () => {
    expect(psychologyUtils.getReciprocityMessage(0)).toBe('まず、あなたの強みを発見しましょう');
    expect(psychologyUtils.getReciprocityMessage(2)).toBe('あなた専用の戦略をお渡しします');
    expect(psychologyUtils.getReciprocityMessage(10)).toBe('まず、あなたの強みを発見しましょう');
  });
});

describe('responsiveUtils', () => {
  beforeEach(() => {
    // Mock window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  it('should detect mobile correctly', () => {
    window.innerWidth = 500;
    expect(responsiveUtils.isMobile()).toBe(true);
    
    window.innerWidth = 1000;
    expect(responsiveUtils.isMobile()).toBe(false);
  });

  it('should detect tablet correctly', () => {
    window.innerWidth = 800;
    expect(responsiveUtils.isTablet()).toBe(true);
    
    window.innerWidth = 500;
    expect(responsiveUtils.isTablet()).toBe(false);
  });

  it('should return safe area insets', () => {
    const insets = responsiveUtils.getSafeAreaInsets();
    expect(insets).toHaveProperty('top');
    expect(insets).toHaveProperty('bottom');
    expect(insets).toHaveProperty('left');
    expect(insets).toHaveProperty('right');
  });

  it('should return touch friendly sizes', () => {
    window.innerWidth = 500; // Mobile
    expect(responsiveUtils.getTouchFriendlySize('md')).toBe('h-14 px-6');
    
    window.innerWidth = 1000; // Desktop
    expect(responsiveUtils.getTouchFriendlySize('md')).toBe('h-12 px-4');
  });
});

describe('validationUtils', () => {
  it('should return positive messages', () => {
    expect(validationUtils.getPositiveMessage('name', 'John')).toBe('素晴らしいお名前ですね！');
    expect(validationUtils.getPositiveMessage('unknown', 'value')).toBe('入力ありがとうございます！');
  });

  it('should return gentle error messages', () => {
    expect(validationUtils.getGentleErrorMessage('', 'required')).toBe('こちらも教えていただけますか？');
    expect(validationUtils.getGentleErrorMessage('', 'email')).toBe('メールアドレスの形式をご確認ください');
  });

  it('should validate fields correctly', () => {
    // Required field validation
    const requiredResult = validationUtils.validateField('', { required: true });
    expect(requiredResult.isValid).toBe(false);
    
    const validResult = validationUtils.validateField('test', { required: true });
    expect(validResult.isValid).toBe(true);
    
    // Min length validation
    const shortResult = validationUtils.validateField('ab', { minLength: 3 });
    expect(shortResult.isValid).toBe(false);
    
    // Email validation
    const invalidEmailResult = validationUtils.validateField('invalid', { email: true });
    expect(invalidEmailResult.isValid).toBe(false);
    
    const validEmailResult = validationUtils.validateField('test@example.com', { email: true });
    expect(validEmailResult.isValid).toBe(true);
  });
});

describe('apiUtils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it('should have correct base URL', () => {
    expect(apiUtils.baseURL).toBe('https://pathpilot.riho-dare.workers.dev/api');
  });

  it('should make successful API requests', async () => {
    const mockResponse = { success: true, data: { test: 'data' } };
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await apiUtils.request('/test');
    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://pathpilot.riho-dare.workers.dev/api/test',
      expect.objectContaining({
        headers: { 'Content-Type': 'application/json' }
      })
    );
  });

  it('should handle API errors', async () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    const mockErrorResponse = { error: { message: 'Test error' } };
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      json: async () => mockErrorResponse,
    });

    await expect(apiUtils.request('/test')).rejects.toThrow('Test error');
    
    consoleSpy.mockRestore();
  });

  it('should handle network errors', async () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

    await expect(apiUtils.request('/test')).rejects.toThrow('Network error');
    
    consoleSpy.mockRestore();
  });

  it('should manage auth tokens', () => {
    // Test setAuthToken
    apiUtils.setAuthToken('test-token');
    expect(localStorage.setItem).toHaveBeenCalledWith('pathpilot_token', 'test-token');
    
    // Test getAuthToken
    (localStorage.getItem as any).mockReturnValueOnce('test-token');
    expect(apiUtils.getAuthToken()).toBe('test-token');
    
    // Test removeAuthToken
    apiUtils.removeAuthToken();
    expect(localStorage.removeItem).toHaveBeenCalledWith('pathpilot_token');
  });
});

describe('dateUtils', () => {
  beforeEach(() => {
    // Mock current date
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-01-15T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should format relative dates correctly', () => {
    const now = new Date('2024-01-15T12:00:00Z');
    
    // Same time
    expect(dateUtils.formatRelative(now)).toBe('今');
    
    // 2 hours ago
    const twoHoursAgo = new Date('2024-01-15T10:00:00Z');
    expect(dateUtils.formatRelative(twoHoursAgo)).toBe('2時間前');
    
    // 2 days ago
    const twoDaysAgo = new Date('2024-01-13T12:00:00Z');
    expect(dateUtils.formatRelative(twoDaysAgo)).toBe('2日前');
    
    // More than a week ago
    const longAgo = new Date('2024-01-01T12:00:00Z');
    expect(dateUtils.formatRelative(longAgo)).toBe('2024/1/1');
  });

  it('should format duration correctly', () => {
    expect(dateUtils.formatDuration(30)).toBe('30分');
    expect(dateUtils.formatDuration(60)).toBe('1時間');
    expect(dateUtils.formatDuration(90)).toBe('1時間30分');
    expect(dateUtils.formatDuration(120)).toBe('2時間');
  });
});

describe('storageUtils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should get values from localStorage', () => {
    (localStorage.getItem as any).mockReturnValueOnce('{"test": "value"}');
    expect(storageUtils.get('test-key')).toEqual({ test: 'value' });
    
    (localStorage.getItem as any).mockReturnValueOnce(null);
    expect(storageUtils.get('missing-key', 'default')).toBe('default');
  });

  it('should handle JSON parse errors', () => {
    (localStorage.getItem as any).mockReturnValueOnce('invalid-json');
    expect(storageUtils.get('test-key', 'default')).toBe('default');
  });

  it('should set values in localStorage', () => {
    const testData = { test: 'value' };
    storageUtils.set('test-key', testData);
    expect(localStorage.setItem).toHaveBeenCalledWith('test-key', JSON.stringify(testData));
  });

  it('should remove values from localStorage', () => {
    storageUtils.remove('test-key');
    expect(localStorage.removeItem).toHaveBeenCalledWith('test-key');
  });

  it('should handle localStorage errors gracefully', () => {
    // Suppress console.warn for this test
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    
    (localStorage.setItem as any).mockImplementationOnce(() => {
      throw new Error('Storage error');
    });
    
    // Should not throw
    expect(() => storageUtils.set('test', 'value')).not.toThrow();
    
    consoleSpy.mockRestore();
  });

  it('should handle localStorage remove errors gracefully', () => {
    // Suppress console.warn for this test
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    
    (localStorage.removeItem as any).mockImplementationOnce(() => {
      throw new Error('Remove storage error');
    });
    
    // Should not throw
    expect(() => storageUtils.remove('test-key')).not.toThrow();
    
    consoleSpy.mockRestore();
  });
});

describe('animationUtils', () => {
  it('should have correct entrance animations', () => {
    expect(animationUtils.entrance.fadeInUp).toEqual({
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    });

    expect(animationUtils.entrance.slideInRight).toEqual({
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    });

    expect(animationUtils.entrance.scaleIn).toEqual({
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
    });
  });

  it('should have correct stagger animations', () => {
    expect(animationUtils.stagger.container).toEqual({
      animate: {
        transition: {
          staggerChildren: 0.1,
        },
      },
    });

    expect(animationUtils.stagger.item).toEqual({
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
    });
  });

  it('should have correct micro-interactions', () => {
    expect(animationUtils.microInteractions.buttonPress).toEqual({
      whileTap: { scale: 0.95 },
      transition: { duration: 0.1 },
    });

    expect(animationUtils.microInteractions.cardHover).toEqual({
      whileHover: { y: -2, scale: 1.02 },
      transition: { duration: 0.2 },
    });

    expect(animationUtils.microInteractions.iconBounce).toEqual({
      animate: { y: [0, -3, 0] },
      transition: { duration: 0.6, repeat: Infinity, repeatDelay: 3 },
    });
  });
});