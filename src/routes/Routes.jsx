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
import Loader from '../components/Loader/Loader';
import ManageFoods from '../components/ManageFoods/ManageFoods';
import MyFood from '../pages/MyFood';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,

    errorElement: <Error404 />,
    children: [
      {
        index: true,
        Component: Home,
        loader: async () =>
          await fetch('http://localhost:5100/api/featured-foods').then(res =>
            res.json()
          ),
      },
      {
        path: '/',
        Component: Home,
      },
      {
        path: '/available-foods',
        loader: async () => {
          const res = await fetch('http://localhost:5100/api/foods/availables');
          if (!res.ok) throw new Error('Failed to fetch foods');
          return res.json();
        },
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
        path: '/manage-foods',
        element: (
          <PrivateRoutes>
            <ManageFoods />
          </PrivateRoutes>
        ),
      },
      {
        path: '/my-food-requests',
        element: (
          <PrivateRoutes>
            <MyFood />
          </PrivateRoutes>
        ),
      },
      {
        path: '/foods/:id',
        loader: async ({ params }) => {
          const res = await fetch(
            `http://localhost:5100/api/foods/${params.id}`
          );
          if (!res.ok) throw new Error('Failed to fetch foods');
          return res.json();
        },
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
  {
    HydrateFallback: <Loader />,
  },
]);
