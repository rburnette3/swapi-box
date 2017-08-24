import React from 'react';
import './Favorites.css';
import PropTypes from 'prop-types';

const Favorites = ({counter, displayFavorites}) => {
  return(
    <div className="favorites-counter">
      <button className="favorites-btn"
      onClick=
      {displayFavorites} >Favorites <span>{counter}</span></button>
    </div>
  )
}

Favorites.propTypes = {
  counter: PropTypes.number,
  displayFavorites: PropTypes.func
}

  export default Favorites;
