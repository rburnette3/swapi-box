import React from 'react'
import Favorites from './Favorites/Favorites'
import './Header.css';

const Header = ({fetchFromAPI, counter, displayFavorites}) => {

  return(
    <div>
      // <div className='swapi-logo'></div>
      <Favorites counter= {counter}
      displayFavorites= {displayFavorites} />

      <div className='header-btn-container'>
        <button className="header-btn people-btn"
                onClick={(e) => {fetchFromAPI(e, 'people')}}>People</button>
        <button className="header-btn planets-btn"
                onClick={(e) => {fetchFromAPI(e, 'planets')}}>Planets</button>
        <button className="header-btn vehicles-btn"
                onClick={(e) => {fetchFromAPI(e, 'vehicles')}}>Vehicles</button>
      </div>
    </div>
  )
}


export default Header;
