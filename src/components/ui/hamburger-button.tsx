import type { ComponentProps } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const HamburgerButton = ({
  isOpen = false,
  className,
  ...props
}: ComponentProps<"button"> & {
  isOpen?: boolean;
}) => {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      aria-label={isOpen ? t('common.closeMenu') : t('common.openMenu')}
      className={cn(
        "md:hidden z-50 p-2 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors",
        className,
      )}
      {...props}
    >
      {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
    </button>
  );
};

export { HamburgerButton };
