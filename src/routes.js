import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from '../src/layouts/MainLayout';
import NotFoundView from '../src/views/errors/NotFoundView';
import HomePage from '../src/views/HomePage/HomePage'



//TopNav
import LoginPage from '../src/layouts/LoginPage'
import LoginLayout from '../src/components/LoginLayout'
import RegisterPage from '../src/layouts/RegisterPage'


//Nav
import Playlist from '../src/views/Playlist'
import Discover from '../src/views/Discover'


const routes = [

  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: 'playlist', element: <Playlist /> },
      { path: 'Discover', element: <Discover /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },




  {
    path: '/auth',
    element: <LoginLayout />,
    children: [
      {path: '/', element: <LoginPage/> },
      // {path: '/register', element: <RegisterPage/> },
    ]
  },





  {
    path: '404',
    children: [
      { path: '/', element: <NotFoundView/>},
      { path: '*', element: <Navigate to="/404" /> },
    ]
  },


];

export default routes;
