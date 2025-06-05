
export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200; // Average reading speed
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length; // Remove HTML tags and count words
  const minutes = Math.ceil(words / wordsPerMinute);
  return Math.max(1, minutes); // Minimum 1 minute
};

export const formatReadingTime = (minutes: number): string => {
  return `${minutes} min read`;
};
