import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/components/App.jsx'
import { ConfigProvider } from '@/context/ConfigContext.jsx'
import { AuthProvider } from '@/context/AuthContext.jsx'
import '@/css/index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ConfigProvider>
  </StrictMode>
)