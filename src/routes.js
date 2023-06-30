import Root from "./Components/Root"
import NewsGrid from "./Components/NewsGrid"
import NewsDetail from "./Components/NewsDetail"
import Contact from "./Components/Contact"
import Favorites from "./Components/Favorites"

const routes = {
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
    },
    {
      path: 'contacto',
      element: <Contact/>
    },
    {
      path: 'favoritos',
      element: <Favorites/>
    }
  ]
}

export default routes