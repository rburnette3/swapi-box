import React, { Component } from 'react';
import './App.css';
import Header from './Header/Header';
import CardList from './CardList/CardList';
import API from '../Utils/API';

//TODO:
  // In the API, we have 3 if statements
    // break these out into seperate functions
    // do they need to each return a promise then?
    // actually they may be already..so minimal refactor

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
    apiObject.fetchDataFromAPI()
      .then(result => {
        console.log('what is full array result:', result);
        this.setState({
          cardList: result
        })
      })
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
