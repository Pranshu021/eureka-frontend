import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ReportProvider } from './contexts/ReportContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReportProvider>
        <App />
    </ReportProvider>
  </StrictMode>,
)
