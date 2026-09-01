import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SEO_DATA: Record<string, { title: string; description: string }> = {
  pt: {
    title: 'Vinícius Costa - Desenvolvedor Front-end',
    description: 'Vinícius Costa — desenvolvedor front-end. Experiência com React, TypeScript, Next.js e Tailwind.'
  },
  en: {
    title: 'Vinícius Costa - Front-end Developer',
    description: 'Vinícius Costa — front-end developer. Experience with React, TypeScript, Next.js and Tailwind.'
  }
};

export function useDocumentLang() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;

    const seoData = SEO_DATA[i18n.language] || SEO_DATA.pt;
    document.title = seoData.title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', seoData.description);
    }
  }, [i18n.language]);
}
