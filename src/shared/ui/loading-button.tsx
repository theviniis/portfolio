import { useTranslation } from 'react-i18next'
import { Button, type ButtonProps } from '@/shared/ui/button'
import { Spinner } from '@/shared/ui/spinner'

export function LoadingButton({
  isLoading,
  ...props
}: ButtonProps & { isLoading?: boolean }) {
  const { t } = useTranslation()

  if (isLoading) {
    return (
      <Button disabled {...props}>
        <Spinner data-icon="inline-start" />
        {t('common.sending')}
      </Button>
    )
  }

  return <Button {...props} />
}
