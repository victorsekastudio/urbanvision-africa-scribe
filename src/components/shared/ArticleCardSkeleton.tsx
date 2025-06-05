
import { Skeleton } from "@/components/ui/skeleton";

interface ArticleCardSkeletonProps {
  size?: 'default' | 'large';
}

export const ArticleCardSkeleton = ({ size = 'default' }: ArticleCardSkeletonProps) => {
  const imageHeight = size === 'large' ? 'h-64' : 'h-48';
  
  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-lg">
        <Skeleton className={`w-full ${imageHeight}`} />
      </div>
      
      <div className="space-y-3">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-2" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};
