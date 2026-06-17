import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/components/App.jsx'
import { ConfigProvider } from '@/context/ConfigContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import '@/css/index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </StrictMode>,
)
