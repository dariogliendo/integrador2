import React from 'react';
import './App.css';
import NewsGrid from './Components/NewsGrid';
import NewsDetail from './Components/NewsDetail';
import Root from './Components/Root';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
      {
        path: '',
        element: <NewsGrid section="ultimas-noticias"/>
      },
      {
        path: 'primera',
        element: <NewsGrid section="futbol-primera"/>
      },
      {
        path: 'copa-argentina',
        element: <NewsGrid section="copa-argentina"/>
      },
      {
        path: 'internacional',
        element: <NewsGrid section="futbol-internacional"/>
      },
      {
        path: 'libertadores',
        element: <NewsGrid section="futbol-internacional/libertadores"/>
      },
      {
        path: 'basquet',
        element: <NewsGrid section="basquet"/>
      },
      {
        path: 'boxeo',
        element: <NewsGrid section="boxeo"/>
      },
      {
        path: 'article/:url',
        element: <NewsDetail/>
      }
    ]
  }
])

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>
  );
}

export default App;
