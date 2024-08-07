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
        element:<Details/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
    </QueryClientProvider>
)
