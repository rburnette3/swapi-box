import React, { Component } from 'react';
import './App.css';
import Header from './Header/Header';
import CardList from './CardList/CardList';
import API from '../Utils/API';
import Crawl from './Crawl/Crawl';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      swapiList: [],
      favoriteList: [],
      counter: 0
    };
  }

  fetchFromAPI(type) {
    let cleanedApiData;
    let apiObject = new API(type);
    apiObject.fetchDataFromAPI()
      .then(response => {
        this.setState({
          swapiList: response
        })
      });
  }

    isSwapiInFavs(element) {
      return this === element.name;
    }

    addToFavorites(swapiObj) {

      const indexOfSwapiObj = this.state.favoriteList.findIndex(this.isSwapiInFavs, swapiObj.name);

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
        <Crawl />
        <p>SWAPI-Box</p>
        <Header counter= {this.state.counter} fetchFromAPI={this.fetchFromAPI.bind(this)} displayFavorites= {this.displayFavorites.bind(this)}/>
        <CardList swapiList={this.state.swapiList} addToFavorites={this.addToFavorites.bind(this)} />
      </div>
    );
  }
}
