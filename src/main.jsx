import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { router } from './routes/Routes';
import { RouterProvider } from 'react-router/dom';
import AuthProvider from './context/AuthContext';
import Loader from './components/Loader/Loader';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider
        router={router}
        fallbackElement={<Loader />}
        HydrateFallback={<Loader />}
      />
    </AuthProvider>
  </StrictMode>
);
