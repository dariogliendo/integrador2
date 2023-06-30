import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { styled } from 'styled-components'


const NewsDetail = ({ }) => {
  const [paragraphs, setParagraphs] = useState([])
  const [imageData, setImageData] = useState({})
  const [subtitle, setSubtitle] = useState('')
  const [title, setTitle] = useState('')
  const { url } = useParams()
  useEffect(() => {
    const fetchElement = async () => {
      try {
        if (!url) return
        const res = await fetch(decodeURIComponent(url))
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
      } catch (error) {
        console.error(error)
      }
    }
    fetchElement()
  }, [url])

  function renderParagraphs(paragraphs) {
    return paragraphs.map(paragraph =>
      <p>
        {paragraph}
      </p>
    )
  }

  const ArticleContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 0px 40px;

    article {
      width: 50%;
      p {
        margin: 9px 0;
      }
    }
  `

  return (
    <ArticleContainer>
      <h1>{title}</h1>
      <img src={imageData.url} alt={imageData.alt} />
      <article>
        <h3>{subtitle}</h3>
        {renderParagraphs(paragraphs)}
      </article>
    </ArticleContainer>
  )
}

export default NewsDetail