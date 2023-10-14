import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { LoginProvider } from './features/login/LoginProvider.tsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LoginProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LoginProvider>
  </React.StrictMode>
)
