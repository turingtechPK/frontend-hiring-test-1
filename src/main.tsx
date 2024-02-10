import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App.tsx';
import '@/index.css';
import { SnackbarProvider } from 'notistack';
import { ErrorBoundary } from '@/components';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        disableWindowBlurListener
        preventDuplicate
        maxSnack={2}
      >
        <App />
      </SnackbarProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
