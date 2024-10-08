import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Root';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './Page/Home';
import ContextProvider from './Auth/ContextProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Menu from './Page/Menu';
import Details from './Page/Details';
import { Toaster } from 'react-hot-toast';
import Cart from './Page/Cart';
import PrivateRoute from './Route/PrivateRoute';
import Catagories from './Page/Catagories';
import SuccessPage from './Page/SuccessPage';
import DashboardLayout from './Layouts/DashboardLayout';
import Profile from './components/Dashboard/Profile';
import AddFood from './components/Dashboard/AddFood';
import MyFood from './components/Dashboard/MyFood';
import MyTransition from './components/Dashboard/MyTransition';
import AllUsers from './components/Dashboard/AllUsers';
import MyFav from './components/Dashboard/MyFav';
import Statistics from './components/Dashboard/Statistics';
import Contact from './Page/ContactUs';
import About from './Page/AboutUs';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/signin",
        element: <SignIn />
      },
      {
        path: "/signup",
        element: <SignUp />
      },
      {
        path:'/menu',
        element:<Menu/>
      },
      {
        path:'/itemDetails/:id',
        element:<PrivateRoute><Details/></PrivateRoute>
      },
      {
        path:"/cart",
        element:<PrivateRoute><Cart/></PrivateRoute>
      },
      {
        path:'/catagorie/:name',
        element:<Catagories/>
      },
      {
        path:'/success',
        element:<SuccessPage/>
      },
      {
        path:'/contact',
        element:<Contact/>
      },
      {
        path:'/about',
        element:<About/>
      }
    ]
  },
  {
    path:'dashboard',
    element:<DashboardLayout/>,
    children:[
      {
        path:'profile',
        element:<PrivateRoute><Profile/></PrivateRoute>
      },
      {
        path:'addFood',
        element:<PrivateRoute><AddFood/></PrivateRoute>
      },
      {
        path:'myFood',
        element:<PrivateRoute><MyFood/></PrivateRoute>
      },
      {
        path:'myFood',
        element:<PrivateRoute><MyFood/></PrivateRoute>
      },
      {
        path:'myTransition',
        element:<PrivateRoute><MyTransition/></PrivateRoute>
      },
      {
        path:'allUsers',
        element:<PrivateRoute><AllUsers/></PrivateRoute>
      },
      {
        path:'myFav',
        element:<PrivateRoute><MyFav/></PrivateRoute>
      },
      {
        path:'statistics',
        element:<PrivateRoute><Statistics/></PrivateRoute>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
    <Toaster />
    </QueryClientProvider>
)
