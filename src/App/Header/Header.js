import React from 'react'
import Favorites from './Favorites/Favorites'

const Header = () => {

  return(
    <div>
      <Favorites />
      <button className="header-btn people-btn">People</button>
      <button className="header-btn planets-btn">Planets</button>
      <button className="header-btn vehicles-btn">Vehicles</button>
    </div>
  )

}

export default Header;
