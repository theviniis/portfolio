import { Button, type ButtonProps } from '@/shared/ui/button';
import { cn } from '@/shared/lib/utils';

interface CtaButtonProps extends Omit<ButtonProps, 'size' | 'asChild'> {
  label: string;
  icon: React.ReactNode;
  href?: string;
  download?: string;
  size?: 'default' | 'lg';
}

export function CtaButton({
  label,
  icon,
  href,
  download,
  size = 'lg',
  className,
  ...props
}: CtaButtonProps) {
  return (
    <Button asChild size={size} className={cn('pe-1', className)} {...props}>
      <a href={href} download={download}>
        <span>{label}</span>
        <Button asChild variant="secondary" size="icon-sm">
          <span>{icon}</span>
        </Button>
      </a>
    </Button>
  );
}
