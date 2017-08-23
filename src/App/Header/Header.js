import React from 'react'
import Favorites from './Favorites/Favorites'
import './Header.css';

const Header = ({fetchFromAPI, counter, displayFavorites}) => {

  return(
    <div>
      <Favorites counter= {counter}
      displayFavorites= {displayFavorites} />
      <div className='swapi-logo'></div>
      <div className='header-btn-container'>
        <button className="header-btn people-btn"
                onClick={() => {fetchFromAPI('people')}}>People</button>
        <button className="header-btn planets-btn"
                onClick={() => {fetchFromAPI('planets')}}>Planets</button>
        <button className="header-btn vehicles-btn"
                onClick={() => {fetchFromAPI('vehicles')}}>Vehicles</button>
      </div>
    </div>
  )
}


export default Header;
