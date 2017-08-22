import React from 'react';
import './Favorites.css';

const Favorites = ({counter}) => {
  return(
    <div className="favorites-counter">
      <button className="favorites-btn" >Favorites <span>{counter}</span></button>
    </div>
  )
}

  export default Favorites;
