import React from 'react';
import './Card.css';
import PropTypes from 'prop-types';


const Card = ({swapiObj, addToFavorites}) => {

  let residentsArray;

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
        <button className='card-fav-btn' onClick={() => {addToFavorites(swapiObj)}}>favorite
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
        <button className='card-fav-btn' onClick={() => {addToFavorites(swapiObj)}}>favorite
        </button>
          <ul>
            <li>Terrain: {swapiObj.Terrain}</li>
            <li>Population: {swapiObj.Population}</li>
            <li>Climate: {swapiObj.Climate}</li>
            <li>Residents: {residentsArray.length > 0 ? residentsArray : 'None'}</li>
          </ul>
    </article>}

  {swapiObj.Type === 'vehicles' &&
    <article className='display-card card-vehicle'>
      <h2 className='card-name'>{swapiObj.Name}</h2>
        <button className='card-fav-btn' onClick={() => {addToFavorites(swapiObj)}}>favorite
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

}

export default Card;
