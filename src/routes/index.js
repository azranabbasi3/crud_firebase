import { createBrowserRouter } from 'react-router-dom';
import Login from '../components/Login';
import Signup from '../components/Signup';
import Root from '../components/Root';
import Profile from '../components/Profile';
const token = localStorage.getItem("accessToken");
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: token ? <Profile /> : <Login />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

export default router; 