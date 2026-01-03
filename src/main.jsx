import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { router } from './routes/Routes';
import { RouterProvider } from 'react-router';
import AuthProvider from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Loader from './components/Loader/Loader';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider
          router={router}
          fallbackElement={<Loader />}
          HydrateFallback={<Loader />}
        />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
