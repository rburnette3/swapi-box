import React from 'react'
import Favorites from './Favorites/Favorites'

const Header = ({fetchFromAPI}) => {

  return(
    <div>
      <Favorites />
      <button className="header-btn people-btn"
              onClick={() => {fetchFromAPI('people')}}>People</button>
      <button className="header-btn planets-btn"
              onClick={() => {fetchFromAPI('planets')}}>Planets</button>
      <button className="header-btn vehicles-btn"
              onClick={() => {fetchFromAPI('vehicles')}}>Vehicles</button>
    </div>
  )
}

export default Header;
