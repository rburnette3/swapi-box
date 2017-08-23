import React from 'react'

const Card = ({swapiObj, addToFavorites}) => {
  
  return(
    <article>
      <h2 className='card-name'>
      {swapiObj.name}</h2>
      <button onClick={() => {addToFavorites(swapiObj)}}>favorite</button>
    </article>
  )
}

export default Card;
