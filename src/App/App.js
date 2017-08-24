import React, { Component } from 'react';
import './App.css';
import Header from './Header/Header';
import CardList from './CardList/CardList';
import API from '../Utils/API';
import Crawl from './Crawl/Crawl';
import helper from '../Utils/helper';
import Giphy from './loading-giphy.gif';


export default class App extends Component {
  constructor() {
    super();

    this.state = {
      swapiList: [],
      favoriteList: [],
      counter: 0,
      crawlObj: {},
      isOnFavs: false
    };
    this.buildCrawlObj().then(result => {
      this.setState({
        crawlObj: result
      })
    })

  }

  buildCrawlObj() {
    let randomMovieNum = Math.floor(Math.random() * (7 - 1 + 1) + 1);
    // randomMovieNum = 7; // UNCOMMENT FOR TESTING...HOW DO YOU TEST RANDOM STUFF
    let helperFuncs = new helper();
    return fetch(`https://swapi.co/api/films/${randomMovieNum}/`)
      .then(result => result.json())
      .then(result => {
        return Object.assign( {},
                              {roman: 'Episode ' + helperFuncs.romanize(result.episode_id).toString()},
                              {title: result.title},
                              {year: new Date(result.release_date).getFullYear()},
                              {crawl: result.opening_crawl}
                            )

      })
  }

  fetchFromAPI(e, type) {
    let allTheBtns = document.querySelectorAll('.header-btn')
    allTheBtns.forEach(btn => btn.classList.remove('btn-active'))
    e.target.classList.toggle('btn-active')

    this.setState({
      swapiList: undefined,
      isOnFavs: false
    }, () => {

      let cleanedApiData;
      let apiObject = new API(type);

      apiObject.fetchDataFromAPI()
      .then(result => {
        this.setState({
          swapiList: result
        })
      })
    })
  }

  isSwapiInFavs(element) {
    return this === element.Name;
  }

  addToFavorites(swapiObj) {
    const indexOfSwapiObj = this.state.favoriteList.findIndex(this.isSwapiInFavs, swapiObj.Name);

    let oldFavoriteList;
    let newCount;

    if (indexOfSwapiObj < 0) {
      oldFavoriteList = [...this.state.favoriteList, swapiObj];
      newCount= this.state.counter +1
    } else {
      oldFavoriteList = this.state.favoriteList.slice();
      oldFavoriteList.splice(indexOfSwapiObj, 1)
      newCount = this.state.counter - 1
    }

    this.setState({
      favoriteList: oldFavoriteList,
      counter: newCount
    })
  }

  displayFavorites() {
    let allTheBtns = document.querySelectorAll('.header-btn')
    allTheBtns.forEach(btn => btn.classList.remove('btn-active'))

    this.setState({
      swapiList: this.state.favoriteList,
      isOnFavs: true
    })
  }

  render() {
    return (
      <div className="App">
        <section className='background'></section>
        <Crawl crawlObj={this.state.crawlObj} />
        <p>SWAPI-Box</p>
        <Header counter= {this.state.counter} fetchFromAPI={this.fetchFromAPI.bind(this)} displayFavorites= {this.displayFavorites.bind(this)}/>

        {this.state.swapiList === undefined &&
          <div>
              <div className='gif-container'><img className="gif" src={ Giphy }/>
              <h2 className='loading-text'>Loading...</h2>
              </div>

          </div>}

        {(this.state.swapiList !== undefined && !this.state.isOnFavs) &&
          <CardList swapiList={this.state.swapiList} favoriteList={this.state.favoriteList} addToFavorites={this.addToFavorites.bind(this)} />
        }

        {(this.state.isOnFavs && this.state.favoriteList.length > 0) &&
          <CardList swapiList={this.state.swapiList} favoriteList={this.state.favoriteList} addToFavorites={this.addToFavorites.bind(this)} />
        }

        {this.state.isOnFavs && this.state.favoriteList.length === 0 &&
          <div className="empty-fav-msg">No Favorites You have...</div>
        }

      </div>
    );
  }
}
