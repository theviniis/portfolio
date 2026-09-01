import { useTranslation } from "react-i18next";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function LoadingButton({
  isLoading,
  ...props
}: ButtonProps & { isLoading?: boolean }) {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <Button disabled {...props}>
        <Spinner data-icon="inline-start" />
        {t('common.sending')}
      </Button>
    );
  }

  return <Button {...props} />;
}
