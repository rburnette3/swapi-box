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
    let apiObject = new API(type);
    apiObject.fetchDataFromAPI();
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
