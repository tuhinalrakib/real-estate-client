import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import Router from './router/Router.jsx'
import AuthProvider from './contexts/AuthProvider.jsx'
import AOS from 'aos'
import 'aos/dist/aos.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'

AOS.init()

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={Router}></RouterProvider>
        <ToastContainer></ToastContainer>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
