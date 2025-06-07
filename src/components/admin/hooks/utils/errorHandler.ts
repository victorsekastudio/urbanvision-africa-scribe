
export interface ErrorContext {
  operation: string;
  articleId?: string;
  userId?: string;
  timestamp: string;
}

export interface EnhancedError {
  message: string;
  type: 'validation' | 'network' | 'database' | 'authentication' | 'permission' | 'unknown';
  isRetryable: boolean;
  suggestions: string[];
  context?: ErrorContext;
}

export const getErrorMessage = (error: any, context?: ErrorContext): string => {
  if (!error) return 'Unknown error occurred';
  
  let errorMessage = error.message || 'Unknown error occurred';
  
  if (error.code === '23505') {
    errorMessage = 'An article with this slug already exists. Please use a different title or slug.';
  } else if (error.code === '23503') {
    errorMessage = 'Invalid author or category selected. Please check your selections.';
  } else if (error.code === '42703') {
    errorMessage = 'Database schema error. Please contact support.';
  }
  
  return errorMessage;
};

export const analyzeError = (error: any, context?: ErrorContext): EnhancedError => {
  console.error('Error analysis:', { error, context });

  // Database constraint errors
  if (error.code === '23505') {
    return {
      message: 'An article with this slug already exists. Please use a different title or slug.',
      type: 'validation',
      isRetryable: false,
      suggestions: [
        'Try modifying the title to generate a new slug',
        'Manually edit the slug to make it unique',
        'Check if you\'re editing an existing article'
      ],
      context,
    };
  }

  // Foreign key constraint errors
  if (error.code === '23503') {
    return {
      message: 'Invalid author or category selected. Please check your selections.',
      type: 'validation',
      isRetryable: false,
      suggestions: [
        'Refresh the page to reload author and category options',
        'Check if the selected author or category still exists',
        'Try selecting a different author or category'
      ],
      context,
    };
  }

  // Network/connection errors
  if (error.name === 'NetworkError' || error.message?.includes('fetch') || error.message?.includes('network')) {
    return {
      message: 'Network connection issue. Please check your internet connection and try again.',
      type: 'network',
      isRetryable: true,
      suggestions: [
        'Check your internet connection',
        'Try again in a few moments',
        'Refresh the page if the problem persists'
      ],
      context,
    };
  }

  // Authentication errors
  if (error.status === 401 || error.message?.includes('unauthorized') || error.message?.includes('auth')) {
    return {
      message: 'Authentication failed. Please sign in again.',
      type: 'authentication',
      isRetryable: false,
      suggestions: [
        'Sign out and sign back in',
        'Check if your session has expired',
        'Contact support if the issue persists'
      ],
      context,
    };
  }

  // Permission errors
  if (error.status === 403 || error.message?.includes('permission') || error.message?.includes('forbidden')) {
    return {
      message: 'You don\'t have permission to perform this action.',
      type: 'permission',
      isRetryable: false,
      suggestions: [
        'Check if you have the required permissions',
        'Contact an administrator',
        'Try refreshing the page'
      ],
      context,
    };
  }

  // Server errors (retryable)
  if (error.status >= 500 && error.status < 600) {
    return {
      message: 'Server error occurred. This is usually temporary.',
      type: 'database',
      isRetryable: true,
      suggestions: [
        'Try again in a few moments',
        'The server may be temporarily unavailable',
        'Contact support if the issue persists'
      ],
      context,
    };
  }

  // Validation errors
  if (error.name === 'ZodError' || error.issues) {
    return {
      message: 'Please check the form data and fix any validation errors.',
      type: 'validation',
      isRetryable: false,
      suggestions: [
        'Check all required fields are filled',
        'Verify that URLs are valid',
        'Ensure text fields don\'t exceed character limits'
      ],
      context,
    };
  }

  // Default case
  return {
    message: error.message || 'An unexpected error occurred',
    type: 'unknown',
    isRetryable: false,
    suggestions: [
      'Try refreshing the page',
      'Check your internet connection',
      'Contact support if the issue persists'
    ],
    context,
  };
};

export const formatErrorForUser = (enhancedError: EnhancedError): string => {
  let message = enhancedError.message;
  
  if (enhancedError.isRetryable) {
    message += ' This operation can be retried.';
  }
  
  if (enhancedError.suggestions.length > 0) {
    message += `\n\nSuggestions:\n${enhancedError.suggestions.map(s => `• ${s}`).join('\n')}`;
  }
  
  return message;
};
