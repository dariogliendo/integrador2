import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { Link } from 'react-router-dom'

const Favorites = () => {
  const lsItem = localStorage.getItem('favorites')
  const favorites = lsItem && JSON.parse(lsItem)
  const [favArticles, setFavArticles] = useState([])

  useEffect(() => {
    async function getFavorites() {
      const articleArr = []
      for (const favorite of favorites) {
        const data = await fetch('https://corsproxy.io/?' + encodeURIComponent(favorite))
        const text = await data.text()
        const element = new DOMParser().parseFromString(text, 'text/html')
        const article = {
          title: element.querySelector('h1')?.textContent,
          link: encodeURIComponent(favorite)
        }
        articleArr.push(article)
      }
      setFavArticles(articleArr)
    }
    getFavorites()
  }, [])

  const FavoriteContainer = styled.div`
    display: flex;
    flex-direction: column;

    a {
      color: black;
      text-decoration: none;
    }
  `

  const favCard = styled.div`
    display: flex;
    flex-direction: column;
  `

  const renderArticles = favArticles.map((m, ix) => 
  <div key={ix}>
    <Link to={`/article/${m.link}`}>
      <h2>{m.title}</h2>
    </Link>
  </div>)

  return (
    <div>
      <h1>Favorites</h1>
      <FavoriteContainer>
        {renderArticles}
      </FavoriteContainer>
    </div>
  )
}

export default Favorites