import React, { Component } from 'react';
import './App.css';
import Header from './Header/Header';
import CardList from './CardList/CardList';
import API from '../Utils/API';

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
        }, () => console.log('CLEAN DATA: ', this.state.cardList))
      });
  }

    addToFavorites(swapiObj) {
      let oldFavoriteList = [...this.state.favoriteList, swapiObj];
      let newCount= this.state.counter +1
      this.setState({
        favoriteList: oldFavoriteList,
        counter: newCount
      })
    }

    displayFavorites() {
      // let newFavoriteList = [...this.state.favoriteList]

      this.setState({
        swapiList: this.state.favoriteList
      })
    }

  render() {
    return (
      <div className="App">
        <p>SWAPI-Box</p>
        <Header counter= {this.state.counter} fetchFromAPI={this.fetchFromAPI.bind(this)} displayFavorites= {this.displayFavorites.bind(this)}/>
        <CardList swapiList={this.state.swapiList} addToFavorites={this.addToFavorites.bind(this)} />
      </div>
    );
  }
}
