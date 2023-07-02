import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { styled } from 'styled-components'
import deviceBreakpoints from '../utils/mediaQueryBreakpoints'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'


const NewsDetail = () => {
  const [paragraphs, setParagraphs] = useState([])
  const [imageData, setImageData] = useState({})
  const [subtitle, setSubtitle] = useState('')
  const [isFavorite, setIsFavorite] = useState(false)
  const [title, setTitle] = useState('')
  const { url } = useParams()
  const lsItem = localStorage.getItem('favorites')
  const favorites = (lsItem && JSON.parse(lsItem)) || []

  useEffect(() => {
    const fetchElement = async () => {
      try {
        if (!url) return
        const res = await fetch('https://corsproxy.io/?' + url)
        const text = await res.text()
        const articleDocument = new DOMParser().parseFromString(text, 'text/html')
        const body = articleDocument.querySelector('article#storyBody')
        const articleParagraphs = body.querySelectorAll('.custom-text p')
        const articleTitle = articleDocument.querySelector('h1').textContent
        const articleSubtitle = articleDocument.querySelector('h2').textContent
        const imgUrl = articleDocument.querySelector('picture source[data-hero]').getAttribute('srcset')
        const imgAlt = articleDocument.querySelector('picture img[data-hero]').getAttribute('alt')

        setParagraphs([...articleParagraphs].map(m => m.textContent))
        setTitle(articleTitle)
        setSubtitle(articleSubtitle)
        setImageData({
          url: imgUrl,
          alt: imgAlt,
        })
        if (favorites.includes(url)) setIsFavorite(true)
      } catch (error) {
        console.error(error)
      }
    }
    fetchElement()
  }, [url])

  function saveFavorite() {
    if (isFavorite) {
      localStorage.setItem('favorites', JSON.parse(favorites).filter(f => f !== url))
      setIsFavorite(false)
      return
    }
    localStorage.setItem('favorites', JSON.stringify([...favorites, url]))
    setIsFavorite(true)
  }

  function renderParagraphs(paragraphs) {
    return paragraphs.map((paragraph, ix) =>
      <p key={ix}>
        {paragraph}
      </p>
    )
  }

  const ArticleContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    .titleRow {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      svg {
        color: #999999;
        width: 30px;
        height: 30px;
        cursor: pointer;

        &.favorite {
          color: #f4b134;
        }
      }

      h1 {
        margin: 0;
      }
    }
    
    img {
      width: 100%;
    }

    
    article {
      width: 50%;
      p {
        margin: 9px 0;
      }
      
      @media ${deviceBreakpoints.tablet} {
        width: 100%;
        padding: 15px;
      }
    }
  `

  return (
    <ArticleContainer>
      <div className="titleRow">
        <h1>{title}</h1>
        <FontAwesomeIcon icon={faStar} onClick={saveFavorite} className={isFavorite?'favorite':''}/>
      </div>
      <img src={imageData.url} alt={imageData.alt} />
      <article>
        <h3>{subtitle}</h3>
        {renderParagraphs(paragraphs)}
      </article>
    </ArticleContainer>
  )
}

export default NewsDetail