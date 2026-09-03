import { Skeleton } from '@/shared/ui/skeleton';

interface SectionLoadingProps {
  variant: 'projects' | 'contact';
}

export function SectionLoading({ variant }: SectionLoadingProps) {
  return (
    <section className="wrapper">
      <div className="grid md:grid-cols-[1fr_1fr] gap-8 py-8 lg:gap-16 lg:py-16">
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-full max-w-md" />
        </div>
        {variant === 'projects' ? (
          <Skeleton className="aspect-video w-full rounded-lg" />
        ) : (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-10 w-32 ml-auto" />
          </div>
        )}
      </div>
    </section>
  );
}
