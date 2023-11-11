import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {ThemeProvider} from './components/theme-provider'
import {AppRoutes} from './routes'
import {BrowserRouter} from 'react-router-dom'
import {AuthProvider} from './context'
import {CookiesProvider} from 'react-cookie'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
          <BrowserRouter>
            <AuthProvider>
              <AppRoutes />
            </AuthProvider>
          </BrowserRouter>
        </ThemeProvider>
      </CookiesProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
