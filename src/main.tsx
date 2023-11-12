import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {ThemeProvider} from './components/theme-provider'
import {AppRoutes} from './routes'
import {BrowserRouter} from 'react-router-dom'
import {AuthProvider} from './context'
import {ToastContainer} from 'react-toastify'
import {CookiesProvider} from 'react-cookie'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient()
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
          <BrowserRouter>
            <AuthProvider>
              <ToastContainer
                position='top-center'
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='colored'
              />
              <AppRoutes />
            </AuthProvider>
          </BrowserRouter>
        </ThemeProvider>
      </CookiesProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
