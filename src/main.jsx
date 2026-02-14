import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/components/App.jsx'
import { ConfigProvider } from '@/context/ConfigContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@/context/ThemeContext'
import { AuthProvider } from '@/context/AuthContext'
import { ErrorProvider } from '@/context/ErrorContext.jsx'
import '@/css/index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider>
      <ThemeProvider>
        <ErrorProvider>
          <AuthProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </AuthProvider>
        </ErrorProvider>
      </ThemeProvider>
    </ConfigProvider>
  </StrictMode>,
)
