import { RouterProvider } from 'react-router';
import router from './router/Router.tsx';
import React from 'react';

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
