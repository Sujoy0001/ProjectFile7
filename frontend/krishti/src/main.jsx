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
import Dashboard from './Admin/Dashboard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      { index: true, element: <LandingPage /> },        
      { path: "about", element: <About /> },             
      { path: "contact", element: <Contact /> },  
      { path: "/my-work/:category", element: <MyWorkPage /> },
      { path: "/college-work/:category", element: <CollegeWorkPage /> },
    ],
  },
  {
    path: "/admin",
    element: <Login />,
  },
  {
    path: "/admin/dashboard",
    element: <Dashboard />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
