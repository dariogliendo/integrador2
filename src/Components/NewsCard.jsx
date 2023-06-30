import React from 'react'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components'


const NewsCard = ({ data }) => {

  // Styled
  const Card = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-width: 15vw;
    max-height: 200px;
    padding: 6px;
    border: 1px solid #999999;
    border-radius: 4px;
    flex: 1;
    align-items: center;
    transition: transform 0.2s linear;
    -webkit-box-shadow: 7px 7px 5px -6px rgba(0,0,0,0.40);
    -moz-box-shadow: 7px 7px 5px -6px rgba(0,0,0,0.40);
    box-shadow: 7px 7px 5px -6px rgba(0,0,0,0.40);
    background-color: white;

    &:hover {
      transform: scale(1.1)
    }

    a {
      color: black;
      text-decoration: none;
      font-weight: 700;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  `

  return (
    <Card>
      <Link to={`/article/${encodeURIComponent(data.link)}`}>
        <img src={data.image} alt={data.title} style={{ width: '100%' }} />
        <strong>{data.title}</strong>
      </Link>
    </Card>
  )
}

export default NewsCard