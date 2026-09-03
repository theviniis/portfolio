import cvUrlPt from '@/assets/cv_vinicius_costa.docx?url'
import cvUrlEn from '@/assets/en_cv_vinicius_costa.docx?url'

export const CV_MAP: Record<string, { url: string; filename: string }> = {
  'pt-BR': { url: cvUrlPt, filename: 'cv_vinicius_costa.docx' },
  'en-US': { url: cvUrlEn, filename: 'en_cv_vinicius_costa.docx' }
}

export function getCvForLang(lang: string) {
  return CV_MAP[lang] ?? CV_MAP['pt-BR']
}
