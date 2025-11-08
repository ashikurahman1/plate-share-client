import { createBrowserRouter } from 'react-router';
import RootLayout from '../root/RootLayout';
import Home from '../pages/Home';
import AvailableFoods from '../pages/AvailableFoods';

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
]);
