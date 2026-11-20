import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LazyMotion, domMax } from 'motion/react'
import './i18n'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LazyMotion features={domMax} strict>
      <App />
    </LazyMotion>
  </StrictMode>
)
