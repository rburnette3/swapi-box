import React from 'react';
import Card from './Card/Card';
import './CardList.css';
import PropTypes from 'prop-types';

const CardList = ({swapiList, addToFavorites, favoriteList}) => {
  // console.log('SWAPI LIST:', swapiList);
  const cardInstance = swapiList.map((dataObj, i) =>
    <Card swapiObj= {dataObj}
      addToFavorites= {addToFavorites}
      favoriteList={favoriteList}
      key={`${dataObj.Name}-${i}`} />
    )

    console.log('CARD LIST:', swapiList);

  return(
    <div>
      <section  className='card-container'>
        {cardInstance}
      </section>
    </div>
  )

}

CardList.PropTypes = {
  swapiList: PropTypes.arrayOf(PropTypes.object),
  favoriteList: PropTypes.arrayOf(PropTypes.object),
  addToFavorites: PropTypes.func
}

export default CardList;
