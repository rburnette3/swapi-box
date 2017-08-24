import React from 'react'
import Favorites from './Favorites/Favorites'
import './Header.css';
import Swapilogo from './swapi-logo.svg';

const Header = ({fetchFromAPI, counter, displayFavorites}) => {

  return(
    <div>
      <div className='logo-container'>
      <img className='swapi-logo' src="{ Swapilogo }" alt=""/></div>
      <Favorites counter= {counter}
      displayFavorites= {displayFavorites} />
      <div className='fixed-heading'>
        <div className='header-btn-container'>
          <button className="header-btn people-btn"
                  onClick={(e) => {fetchFromAPI(e, 'people')}}>People</button>
          <button className="header-btn planets-btn"
                  onClick={(e) => {fetchFromAPI(e, 'planets')}}>Planets</button>
          <button className="header-btn vehicles-btn"
                  onClick={(e) => {fetchFromAPI(e, 'vehicles')}}>Vehicles</button>
        </div>
      </div>
    </div>
  )
}


export default Header;
