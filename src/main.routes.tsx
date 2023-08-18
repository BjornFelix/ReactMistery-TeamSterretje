import { RouteObject } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Navbar from './layout/Navbar';
import Logout from './pages/Logout';
import UserDetails from './pages/UserDetails';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/logout',
        element: <Logout />,
      },
      {
        path: '/users/:id',
        element: <UserDetails />,
      },
      {
        path: '/*',
        element: <NotFound />, // * is a wildcard and matches anything!
      },
    ],
  },
];

export default routes;
