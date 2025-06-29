import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import Layout from './components/Layout';
import LandingPage from './Pages/LandingPage';
import About from './Pages/About';
import Contact from './Pages/Contact';
import CollegeWorkPage from './Pages/CollegeWorkPage';
import MyWorkPage from './Pages/MyWorkPage';
import Login from './Admin/Login';
import Layout2 from './Admin/Layout2';
import Dashboard from './Admin/Dashboard';
import Edit from './Admin/Edit';
import {AuthenticatedUserRoute, ProtectRoute} from './utils/userAuthenticated';
import NotFound from './Pages/NotFound';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      { index: true, element: <LandingPage /> },    
      { path: "*", element: <NotFound />},    
      { path: "about", element: <About /> },             
      { path: "contact", element: <Contact /> },  
      { path: "/my-work/:category", element: <MyWorkPage /> },
      { path: "/college-work/:category", element: <CollegeWorkPage /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <AuthenticatedUserRoute>
        <Login />
      </AuthenticatedUserRoute>
  ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectRoute>
        <Layout2 />
      </ProtectRoute>
    ),
    children: [
      { index: true, element: (<ProtectRoute><Dashboard /></ProtectRoute>) },        
      { path: "Edit", element: (<ProtectRoute><Edit /></ProtectRoute>) }, 
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
