import React from 'react';
import './App.css';
import NewsGrid from './Components/NewsGrid';
import NewsDetail from './Components/NewsDetail';
import Root from './Components/Root';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes'

const router = createBrowserRouter([routes])

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>
  );
}

export default App;
