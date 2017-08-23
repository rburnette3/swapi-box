import React from 'react';
import Card from './Card/Card';
import './CardList.css';

const CardList = ({swapiList, addToFavorites}) => {
  // console.log('SWAPI LIST:', swapiList);
  const cardInstance = swapiList.map((dataObj, i) =>
    <Card swapiObj= {dataObj}
      addToFavorites= {addToFavorites}
      key={`${dataObj.Name}-${i}`} />
    )

  return(
    <div>
      <section  className='card-container'>
        {cardInstance}
      </section>
    </div>
  )

}

export default CardList;
