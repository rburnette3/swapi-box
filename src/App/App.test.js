import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount} from 'enzyme'
import App from './App';
import fetchMock from 'fetch-mock';
import MockCrawl from '../Utils/MockCrawl'
import MockAPIPeople1 from '../Utils/MockAPIPeople1'

describe('App Component', () => {
  let wrapper;
  let mockFn;
  const dummySetTimeoutPromise = () => new Promise(resolve => setTimeout(() => resolve(), 10));

  afterEach(function () {
    expect(fetchMock.calls().unmatched).toEqual([]);
    fetchMock.restore();
  })

  // beforeEach(() => {
  //   mockFn = jest.fn();
  //   wrapper = shallow(<App />);
  // });

  test('state obj for crawl should be set correctly', async () => {

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

    expect(fetchMock._matchedCalls.length).toEqual(1)
    expect(fetchMock.called()).toEqual(true);

    await dummySetTimeoutPromise();

    // expect(Object.keys(wrapper.state('crawlObj')).length).toEqual(4);

    await fetchMock.flush()
    .then(result => {
      // console.log('result:', result);
      console.log('what is state:', wrapper.state('crawlObj'));
      expect(Object.keys(wrapper.state('crawlObj')).length).toEqual(4);
      // expect(wrapper.find('.error').length).toEqual(0);
    })

  });


  // test('fetch from API', async () => {
  //
  //   fetchMock.get('https://swapi.co/api/people/?page=1', {
  //     status: 200, // we're mocking the response, so essentially we're saying we got back a 200 status
  //     body: MockAPIPeople1
  //   })
  //
  //   expect(fetchMock._matchedCalls.length).toEqual(0);
  //
  //   // mockFn = jest.fn();
  //   wrapper = mount(<App />);
  //
  //   expect(fetchMock._matchedCalls.length).toEqual(1)
  //   expect(fetchMock.called()).toEqual(true);
  //
  //   wrapper.instance().fetchFromAPI()
  //
  //
  //   await dummySetTimeoutPromise();
  //
  // })

})
