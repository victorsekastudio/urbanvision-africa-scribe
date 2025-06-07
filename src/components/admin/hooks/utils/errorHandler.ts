
export const getErrorMessage = (error: any): string => {
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
