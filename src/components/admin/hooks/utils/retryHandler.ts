
// This file is kept for backward compatibility but is no longer used
// The retry logic has been removed since the underlying RLS policy issues have been resolved

export interface RetryOptions {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
  retryCondition?: (error: any) => boolean;
}

export const defaultRetryOptions: RetryOptions = {
  maxRetries: 3,
  baseDelay: 1000,
  maxDelay: 5000,
  retryCondition: (error) => {
    return error?.code === 'NETWORK_ERROR' || 
           error?.status >= 500 || 
           error?.message?.includes('timeout') ||
           error?.message?.includes('fetch');
  },
};

export const withRetry = async <T>(
  operation: () => Promise<T>,
  options: Partial<RetryOptions> = {}
): Promise<T> => {
  // Simplified - just execute the operation directly
  return await operation();
};

export function createRetryableOperation<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  options?: Partial<RetryOptions>
): T {
  // Simplified - just return the original function
  return fn;
}
