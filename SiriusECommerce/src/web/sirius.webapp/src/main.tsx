import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Importando a configuração i18n (deve ser importado antes dos componentes que usam traduções)
import './i18n';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />    
  </StrictMode>,
)
