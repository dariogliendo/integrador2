import React from 'react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import NewsCard from './NewsCard'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const NewsGrid = ({ section }) => {
  const [news, setNews] = useState([])
  const [mainArticle, setMainArticle] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    fetchNews(section)
  }, [section])

  async function fetchNews(section) {
    try {
      if (!section) return console.error('No se pudieron obtener noticias ya que no se indicó la sección')
      const res = await fetch(`https://www.ole.com.ar/rss/${section}`)
      const text = await res.text()
      const feed = new window.DOMParser().parseFromString(text, "text/xml")
      if (!feed) return console.error('Ocurrió un error. No se pudieron obtener las noticias')
      const parsedNews = parseFeed(feed)
      const firstArticle = parsedNews.splice(0, 1)
      setNews(parsedNews)
      setMainArticle(firstArticle[0])
    } catch (error) {
      console.error(error)
    }
  }

  function parseFeed(feed) {
    const feedItems = feed.querySelectorAll('item')
    const news = [...feedItems].map(m => {
      return {
        title: m.querySelector('title').textContent,
        description: m.querySelector('description').textContent,
        link: m.querySelector('link').textContent,
        pubDate: m.querySelector('pubDate').textContent,
        image: m.querySelector('enclosure').getAttribute('url')
      }
    })
    return news
  }

  function goToMainArticle(path) {
    navigate(path)
  }

  const newsList = news.map((article, ix) =>
    <NewsCard data={article} key={ix} />
  )



  const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;  
    width:100%;
    box-sizing: border-box;
    justify-items: center;
 `

  const MainArticle = styled.div`
    gap: 15px;
    margin-bottom: 30px;
    background-image: url(${mainArticle.image});
    background-size: cover;
    background-repeat: no-repeat;
    height: 70vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 20px 0;
    box-sizing: border-box;
    width: 100%;
    white-space: pre;
    overflow: hidden;
    line-break: normal;
    cursor: pointer;

    h1 {
      color: white;
      text-decoration: none;
      width: 100%;
      background-color: rgba(0,0,0,.8);
      padding: 10px 20px;
      box-sizing: border-box;
    }
  `

  return (
    <div>
      <h1>Noticias</h1>
      <MainArticle onClick={() => goToMainArticle(`/article/${encodeURIComponent(mainArticle.link)}`)}>
        <h1>{mainArticle.title}</h1>
      </MainArticle>
      <Container>
        {newsList}
      </Container>
    </div>
  )
}

export default NewsGrid