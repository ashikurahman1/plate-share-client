import { createBrowserRouter } from 'react-router';
import RootLayout from '../root/RootLayout';
import Home from '../pages/Home';
import AvailableFoods from '../pages/AvailableFoods';
import AuthLayout from '../pages/AuthLayout';
import Register from '../components/AuthPage/Register/Register';
import Login from '../components/AuthPage/Login/Login';
import PrivateRoutes from './PrivateRoutes';
import AddFood from '../pages/AddFood';
import FoodDetails from '../pages/FoodDetails';
import Error404 from '../pages/Error404';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    errorElement: <Error404 />,
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
      {
        path: '/add-food',
        element: (
          <PrivateRoutes>
            <AddFood />
          </PrivateRoutes>
        ),
      },
      {
        path: '/food/:id',
        element: (
          <PrivateRoutes>
            <FoodDetails />
          </PrivateRoutes>
        ),
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
