import cvUrlPt from '@/assets/vinicius_costa_cv.docx?url'
import cvUrlEn from '@/assets/vinicius_costa_cv_en.docx?url'

export const CV_MAP: Record<string, { url: string; filename: string }> = {
  'pt-BR': { url: cvUrlPt, filename: 'vinicius_costa_cv.docx' },
  'en-US': { url: cvUrlEn, filename: 'vinicius_costa_cv_en.docx' }
}

export function getCvForLang(lang: string) {
  return CV_MAP[lang] ?? CV_MAP['pt-BR']
}
