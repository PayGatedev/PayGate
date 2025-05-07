
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SolanaProvider } from './providers/SolonaProvider.tsx'
import { MetaplexProvider } from './providers/MetaplexProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SolanaProvider>
      <MetaplexProvider>
        <App />
      </MetaplexProvider>
    </SolanaProvider>
  </StrictMode>,
)
