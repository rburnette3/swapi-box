import React from 'react';
import './Card.css';
import PropTypes from 'prop-types';


const toggleFavClass = (e) => {
  e.target.classList.toggle('i-am-fav')
}

const Card = ({swapiObj, addToFavorites, favoriteList}) => {

  let residentsArray;

  const itemInArray = favoriteList.find(obj => {
    return obj.Name === swapiObj.Name;
  })

  if (swapiObj.Type === 'planets') {
    residentsArray = swapiObj.Residents.map((resident, i) => {
      return <span key={Date.now().toString() + i.toString()}>{resident}</span>
    })
  }

  return(
  <div>
    {swapiObj.Type === 'people' &&
    <article className='display-card card-people'>
      <h2 className='card-name'>{swapiObj.Name}</h2>
        <button className={itemInArray ? 'card-fav-btn i-am-fav' : 'card-fav-btn'} onClick={(e) => {addToFavorites(swapiObj); toggleFavClass(e)}}>favorite
        </button>
          <ul>
            <li>HomeWorld: {swapiObj.Homeworld}</li>
            <li>Species: {swapiObj.Species}</li>
            <li>Home Population: {swapiObj.Population}</li>
          </ul>
    </article>}

  {swapiObj.Type === 'planets' &&
    <article className='display-card card-planet'>
      <h2 className='card-name'>{swapiObj.Name}</h2>
        <button className={itemInArray ? 'card-fav-btn i-am-fav' : 'card-fav-btn'} onClick={(e) => {addToFavorites(swapiObj); toggleFavClass(e)}}>favorite
        </button>
          <ul>
            <li>Terrain: {swapiObj.Terrain}</li>
            <li>Population: {swapiObj.Population}</li>
            <li>Climate: {swapiObj.Climate}</li>
            <li className='res-text'>Residents: {residentsArray.length > 0 ? residentsArray : 'None'}</li>
          </ul>
    </article>}

  {swapiObj.Type === 'vehicles' &&
    <article className='display-card card-vehicle'>
      <h2 className='card-name'>{swapiObj.Name}</h2>
        <button className={itemInArray ? 'card-fav-btn i-am-fav' : 'card-fav-btn'} onClick={(e) => {addToFavorites(swapiObj), toggleFavClass(e)}}>favorite
        </button>
          <ul>
            <li>Model: {swapiObj.Model}</li>
            <li>Class: {swapiObj.Class}</li>
            <li> #Pasengers: {swapiObj.NumOfPassengers}</li>
          </ul>
    </article>}
  </div>
  )
}

Card.propTypes = {
  swapiObj: PropTypes.object,
  addToFavorites: PropTypes.func,
  favoriteList: PropTypes.array
}

export default Card;
