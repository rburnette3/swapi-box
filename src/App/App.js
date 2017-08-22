import React, { Component } from 'react';
import './App.css';
import Header from './Header/Header';
import CardList from './CardList/CardList';
import API from '../Utils/API';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      cardList: [],
      favoriteList: []
    };
  }

  fetchFromAPI(type) {
    let cleanedApiData;
    let apiObject = new API(type);
    let fullArray = apiObject.fetchDataFromAPI()
    // apiObject.fetchDataFromAPI()
    //   .then(response => {
    //     this.setState({
    //       cardList: response
    //     }, () => console.log('CLEAN DATA: ', this.state.cardList))
    //   });
  }

  render() {
    return (
      <div className="App">
        <p>SWAPI-Box</p>
        <Header fetchFromAPI={this.fetchFromAPI.bind(this)} />
        <CardList />
      </div>
    );
  }
}
