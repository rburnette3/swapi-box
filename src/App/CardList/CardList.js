import React from 'react';
import Card from './Card/Card'

const CardList = ({swapiList, addToFavorites}) => {
  const cardInstance = swapiList.map((dataObj, i) =>
    <Card swapiObj= {dataObj}
      addToFavorites= {addToFavorites}
      key={dataObj.name} />
    )

  return(
    <div>
      {cardInstance}

    </div>
  )

}

export default CardList;
