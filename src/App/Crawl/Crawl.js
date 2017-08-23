import React from 'react';
import './Crawl.css';
import helper from '../../Utils/helper'


const Crawl = ({crawlObj}) => {

  return(

  <div>

    { Object.keys(crawlObj).length === 0 &&
      <div>ERROR LOADING CRAWL</div>
    }

    { Object.keys(crawlObj).length > 0 &&

      <section className="crawl-container">
        <div className="fade"></div>

        <section className="star-wars">

          <div className="crawl">

            <div className="title">
              <p>{crawlObj.roman}</p>
              <h1>{crawlObj.title}</h1>
              <h3>Released: {crawlObj.year}</h3>
            </div>

            <p>{crawlObj.crawl}</p>

          </div>

        </section>
      </section>
    }
  </div>

  )

}

export default Crawl;
