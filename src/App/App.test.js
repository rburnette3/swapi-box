import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount} from 'enzyme'
import App from './App';
import fetchMock from 'fetch-mock';
import MockCrawl from '../Utils/MockCrawl'
import MockAPIPeople1 from '../Utils/MockAPIPeople1'
import Crawl from './Crawl/Crawl'
import Header from './Header/Header'

describe('App Component', () => {
  let wrapper;
  let mockFn;
  const dummySetTimeoutPromise = () => new Promise(resolve => setTimeout(() => resolve(), 10));

  afterEach(function () {
    expect(fetchMock.calls().unmatched).toEqual([]);
    fetchMock.restore();
  })

  beforeEach(function () {
    fetchMock.get('https://swapi.co/api/films/7/', {
      status: 200, // we're mocking the response, so essentially we're saying we got back a 200 status
      body: MockCrawl
    })
  })

  test('state obj for crawl should be set correctly', async () => {

    expect(fetchMock._matchedCalls.length).toEqual(0);
    expect(fetchMock.routes[0].method).toEqual('GET')
    expect(fetchMock.routes[0].response.body).toEqual(MockCrawl)

    wrapper = mount(<App />);

    expect(fetchMock._matchedCalls.length).toEqual(1)
    expect(fetchMock.called()).toEqual(true);

    await dummySetTimeoutPromise();

    await fetchMock.flush()
    .then(result => {
      expect(Object.keys(wrapper.state('crawlObj')).length).toEqual(4);
    })

  });

  test('state should start out empty', () => {
    wrapper = mount(<App />);

    expect(wrapper.state().swapiList.length).toEqual(0)
    expect(wrapper.state().favoriteList.length).toEqual(0)
    expect(wrapper.state().counter).toEqual(0)
    expect(wrapper.state().isOnFavs).toEqual(false)
  })

  test('add to favorites function should add a favorite', () => {
    wrapper = mount(<App />);

    let dummyObj = {
      "Type": "people",
      "Name": "C-3PO",
      "Homeworld": "Tatooine",
      "Population": "200000",
      "Species": "Droid"
    }

    expect(wrapper.state().favoriteList.length).toEqual(0)
    expect(wrapper.state().counter).toEqual(0)
    wrapper.instance().addToFavorites(dummyObj)
    expect(wrapper.state().favoriteList.length).toEqual(1)
    expect(wrapper.state().counter).toEqual(1)
  })

  test('add to favorites of same obj should remove it', () => {
    wrapper = mount(<App />);

    let dummyObj = {
      "Type": "people",
      "Name": "C-3PO",
      "Homeworld": "Tatooine",
      "Population": "200000",
      "Species": "Droid"
    }

    expect(wrapper.state().favoriteList.length).toEqual(0)
    expect(wrapper.state().counter).toEqual(0)

    wrapper.instance().addToFavorites(dummyObj)
    expect(wrapper.state().favoriteList.length).toEqual(1)
    expect(wrapper.state().counter).toEqual(1)

    wrapper.instance().addToFavorites(dummyObj)
    expect(wrapper.state().favoriteList.length).toEqual(0)
    expect(wrapper.state().counter).toEqual(0)
  })

  test('display favorites function should set the state isOnFavs', () => {
    wrapper = mount(<App />);

    expect(wrapper.state().isOnFavs).toEqual(false)
    wrapper.instance().displayFavorites();
    expect(wrapper.state().isOnFavs).toEqual(true)

  });

  test('should contain valid html controls', () => {
    wrapper = mount(<App />);

    expect(wrapper.find('p').length).toEqual(1);
  });

  test('should contain valid components', () => {
    wrapper = mount(<App />);

    expect(wrapper.find(Crawl).length).toEqual(1);
    expect(wrapper.find(Header).length).toEqual(1);
  });

  test('should contain no favs msg when no favs exist', () => {
    wrapper = mount(<App />);

    expect(wrapper.state().favoriteList.length).toEqual(0)
    expect(wrapper.state().counter).toEqual(0)

    expect(wrapper.find('.empty-fav-msg').length).toEqual(0);

    wrapper.instance().displayFavorites();

    expect(wrapper.state().isOnFavs).toEqual(true)
    expect(wrapper.state().favoriteList.length).toEqual(0)
    expect(wrapper.state().counter).toEqual(0)

    expect(wrapper.find('.empty-fav-msg').length).toEqual(1);
  });


})






//
