import React, { Component } from 'react';
import './App.css';
import Header from './Header/Header';
import CardList from './CardList/CardList';
import API from '../Utils/API';
import Crawl from './Crawl/Crawl';
import helper from '../Utils/helper'

//TODO:
  // In the API, we have 3 if statements
    // break these out into seperate functions
    // do they need to each return a promise then?
    // actually they may be already..so minimal refactor

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      swapiList: [],
      favoriteList: [],
      counter: 0,
      crawlObj: {}
    };

    this.buildCrawlObj().then(result => {
      this.setState({
        crawlObj: result
      })
    })

  }

  buildCrawlObj() {
    let randomMovieNum = Math.floor(Math.random() * (7 - 1 + 1) + 1);
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

  fetchFromAPI(type) {

    this.setState({
      swapiList: undefined
    }, () => {

      let cleanedApiData;
      let apiObject = new API(type);

      apiObject.fetchDataFromAPI()
      .then(result => {
        console.log('what is full array result:', result);
        this.setState({
          swapiList: result
        })
      })

    })

    // console.log('Pending Result:', pendingResult.PromiseStatus);
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
    //
    // removeFromFavorites(swapiObj) {
    //   let removedCard = this.
    //
    // }

    displayFavorites() {
      this.setState({
        swapiList: this.state.favoriteList
      })
    }

  render() {
    return (
      <div className="App">
        <Crawl crawlObj={this.state.crawlObj} />
        <p>SWAPI-Box</p>
        <Header counter= {this.state.counter} fetchFromAPI={this.fetchFromAPI.bind(this)} displayFavorites= {this.displayFavorites.bind(this)}/>

        {this.state.swapiList === undefined &&
          <div>ITS LIT BRO</div>
        }

        {this.state.swapiList !== undefined &&
          <CardList swapiList={this.state.swapiList} addToFavorites={this.addToFavorites.bind(this)} />
        }

      </div>
    );
  }
}
