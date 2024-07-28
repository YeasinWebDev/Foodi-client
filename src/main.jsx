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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children:[
      {
        path: "/",
        element:<Home/>
      },
      {
        path: "/signin",
        element: <SignIn/>
      },
      {
        path:"/signup",
        element: <SignUp/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
