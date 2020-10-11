import React from 'react';
import { Navigate } from 'react-router-dom';
import NotFoundView from '../src/views/errors/NotFoundView';
import HomePage from '../src/views/HomePage/HomePage'
import Upload from '../src/views/Upload'
// import Testupload from '../src/views/Upload/upload'




// import MainLayout from '../src/layouts/MainLayout'
import MainLayout from '../src/layouts/HomePageLayout'

//TopNav
import LoginPage from '../src/layouts/LoginPage'
import LoginLayout from '../src/components/LoginLayout'
import RegisterPage from '../src/layouts/RegisterPage'


//Nav
import Playlist from '../src/views/Playlist'
import Discover from '../src/views/Discover'
import Profile from '../src/views/Profile'


const routes = [

  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: 'playlist', element: <Playlist /> },
      { path: 'Discover', element: <Discover /> },
      {path: 'upload' ,element: <Upload/> },
      {path: 'profile' ,element: <Profile/> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/auth',
    element: <LoginLayout />,
    children: [
      {path: '/', element: <LoginPage/> },
      {path: '/register', element: <RegisterPage/> },
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
