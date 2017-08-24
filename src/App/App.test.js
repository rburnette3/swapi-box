import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount} from 'enzyme'
import App from './App';
import fetchMock from 'fetch-mock';
import MockCrawl from '../Utils/MockCrawl'

describe('App Component', () => {
  let wrapper;
  let mockFn;

  afterEach(function () {
    fetchMock.restore()
  })

  // beforeEach(() => {
  //   mockFn = jest.fn();
  //   wrapper = shallow(<App />);
  // });

  test('should exist', () => {
    // console.log('STUFF:', MockCrawl);
    fetchMock.get('https://swapi.co/api/films/7/', {
      status: 200, // we're mocking the response, so essentially we're saying we got back a 200 status
      body: MockCrawl
    })

    expect(fetchMock._matchedCalls.length).toEqual(0);
    expect(fetchMock.routes[0].method).toEqual('GET')
    expect(fetchMock.routes[0].response.body).toEqual(MockCrawl)

    // mockFn = jest.fn();
    wrapper = mount(<App />);

    // let stateCrawlObjKeys = Object.keys(wrapper.state().crawlObj)


    // console.log('WUT:', stateCrawlObjKeys);
    // expect(stateCrawlObjKeys.length).toEqual(0);

    expect(fetchMock._matchedCalls.length).toEqual(1)
    expect(fetchMock.called()).toEqual(true);

    fetchMock.flush()
    .then(() => {
      expect(Object.keys(wrapper.state('crawlObj')).length).toEqual(10);
      // expect(wrapper.find('.error').length).toEqual(0);
    })

  });

  // test('state should start empty', () => {
  //   expect(wrapper.state().swapiList.length).toEqual(0);
  //   expect(wrapper.state().favoriteList.length).toEqual(0);
  // });

})
