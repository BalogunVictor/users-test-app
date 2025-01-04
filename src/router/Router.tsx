import { createBrowserRouter } from 'react-router-dom';
import Pages from './pages.routes.ts';
import Home from '../pages/Home.tsx';
import React from 'react';
import UserDetails from '../pages/UserDetails.tsx';

const router = createBrowserRouter([
  {
    path: Pages.homePage,
    element: <Home />,
  },
  {
    path: Pages.userDetails,
    element: <UserDetails />,
  },
]);

export default router;
