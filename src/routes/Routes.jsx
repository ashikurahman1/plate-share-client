import { createBrowserRouter } from 'react-router';
import RootLayout from '../root/RootLayout';
import Home from '../pages/Home';
import AvailableFoods from '../pages/AvailableFoods';
import Register from '../components/AuthPage/Register/Register';
import Login from '../components/AuthPage/Login/Login';
import PrivateRoutes from './PrivateRoutes';
import FoodDetails from '../pages/FoodDetails';
import Error404 from '../pages/Error404';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';

// Dashboard Components
import DashboardLayout from '../layouts/DashboardLayout';
import DashboardOverview from '../pages/dashboard/Overview';
import AddFood from '../pages/dashboard/AddFood';
import ManageFoods from '../pages/dashboard/ManageFoods';
import MyFoodRequests from '../pages/dashboard/MyFoodRequests';
import Profile from '../pages/dashboard/Profile';
import AdminManage from '../pages/dashboard/AdminManage';
import AdminRoute from './AdminRoute';

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
          await fetch(
            'https://plate-share-serv1.vercel.app/api/featured-foods'
          ).then(res => res.json()),
      },
      {
        path: '/available-foods',
        loader: async () => {
          const res = await fetch(
            'https://plate-share-serv1.vercel.app/api/foods/availables'
          );
          if (!res.ok) throw new Error('Failed to fetch foods');
          return res.json();
        },
        Component: AvailableFoods,
      },
      {
        path: '/foods/:id',
        Component: FoodDetails,
      },
      {
        path: '/about',
        Component: AboutUs,
      },
      {
        path: '/contact',
        Component: ContactUs,
      },
      {
        path: '/register',
        Component: Register,
      },
      {
        path: '/login',
        Component: Login,
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoutes>
        <DashboardLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        index: true,
        Component: DashboardOverview,
      },
      {
        path: 'add-food',
        Component: AddFood,
      },
      {
        path: 'manage-foods',
        Component: ManageFoods,
      },
      {
        path: 'my-requests',
        Component: MyFoodRequests,
      },
      {
        path: 'profile',
        Component: Profile,
      },
      {
        path: 'admin-manage',
        element: (
          <AdminRoute>
            <AdminManage />
          </AdminRoute>
        ),
      },
    ],
  },
]);
