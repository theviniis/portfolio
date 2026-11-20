import { useTranslation } from 'react-i18next'

export function usePortfolioTranslation() {
  return useTranslation('translation', { keyPrefix: 'portfolio' })
}
