import { createBrowserRouter } from 'react-router';
import RootLayout from '../root/RootLayout';
import Home from '../pages/Home';
import AvailableFoods from '../pages/AvailableFoods';
import AuthLayout from '../pages/AuthLayout';
import Register from '../components/AuthPage/Register/Register';
import Login from '../components/AuthPage/Login/Login';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      {
        path: '/',
        Component: Home,
      },
      {
        path: '/available-foods',
        Component: AvailableFoods,
      },
    ],
  },
  {
    path: '/auth',
    Component: AuthLayout,
    children: [
      {
        path: '/auth/register',
        Component: Register,
      },
      {
        path: '/auth/login',
        Component: Login,
      },
    ],
  },
]);
