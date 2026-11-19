import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LazyMotion, domMax } from 'motion/react'
import './i18n'
import App from './App.tsx'
import '@fontsource/manrope/400.css'
import '@fontsource/manrope/500.css'
import '@fontsource/manrope/600.css'
import '@fontsource/bebas-neue'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LazyMotion features={domMax} strict>
      <App />
    </LazyMotion>
  </StrictMode>
)
