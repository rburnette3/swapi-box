import React from 'react'
import Favorites from './Favorites/Favorites'
import './Header.css';
import PropTypes from 'prop-types'

const Header = ({fetchFromAPI, counter, displayFavorites}) => {

  return(
    <div>
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


Header.propTypes = {
  counter: PropTypes.number,
  fetchFromAPI: PropTypes.func,
  displayFavorites: PropTypes.func
}

export default Header;
