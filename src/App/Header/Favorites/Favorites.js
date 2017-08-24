import React from 'react';
import './Favorites.css';

const Favorites = ({counter, displayFavorites}) => {
  return(
    <div className='favorites-container'>
      <div className='swapi-logo'></div>
      <div className="favorites-counter">
        <button className="favorites-btn"
        onClick=
        {displayFavorites} >Favorites <span>{counter}</span></button>
      </div>
    </div>
  )
}

  export default Favorites;
