import React from 'react';
import CardList from './CardList'
import Card from './Card/Card'
import { shallow, mount } from 'enzyme'

describe('CardList Component', () =>  {
  let wrapper;
  let mockFn;
  let mockCardList = [
  {
    "Type": "vehicles",
    "Name": "Sand Crawler",
    "Model": "Digger Crawler",
    "Class": "wheeled",
    "NumOfPassengers": "30"
  },
  {
    "Type": "vehicles",
    "Name": "T-16 skyhopper",
    "Model": "T-16 skyhopper",
    "Class": "repulsorcraft",
    "NumOfPassengers": "1"
  },
  {
    "Type": "vehicles",
    "Name": "X-34 landspeeder",
    "Model": "X-34 landspeeder",
    "Class": "repulsorcraft",
    "NumOfPassengers": "1"
  },
  {
    "Type": "vehicles",
    "Name": "TIE/LN starfighter",
    "Model": "Twin Ion Engine/Ln Starfighter",
    "Class": "starfighter",
    "NumOfPassengers": "0"
  },
  {
    "Type": "vehicles",
    "Name": "Snowspeeder",
    "Model": "t-47 airspeeder",
    "Class": "airspeeder",
    "NumOfPassengers": "0"
  },
  {
    "Type": "vehicles",
    "Name": "TIE bomber",
    "Model": "TIE/sa bomber",
    "Class": "space/planetary bomber",
    "NumOfPassengers": "0"
  },
  {
    "Type": "vehicles",
    "Name": "AT-AT",
    "Model": "All Terrain Armored Transport",
    "Class": "assault walker",
    "NumOfPassengers": "40"
  },
  {
    "Type": "vehicles",
    "Name": "AT-ST",
    "Model": "All Terrain Scout Transport",
    "Class": "walker",
    "NumOfPassengers": "0"
  },
  {
    "Type": "vehicles",
    "Name": "Storm IV Twin-Pod cloud car",
    "Model": "Storm IV Twin-Pod",
    "Class": "repulsorcraft",
    "NumOfPassengers": "0"
  },
  {
    "Type": "vehicles",
    "Name": "Sail barge",
    "Model": "Modified Luxury Sail Barge",
    "Class": "sail barge",
    "NumOfPassengers": "500"
  }
]

  beforeEach(() => {
    mockFn = jest.fn();
    wrapper = shallow(<CardList swapiList={mockCardList} favoriteList={[]} addToFavorites={mockFn} />);
  });

  test('should exist', () => {
    expect(wrapper).toBeDefined();
  });

  test('should have correct number of cards in CardList', () => {
    expect(wrapper.instance().props.swapiList.length).toEqual(10);
  });

  test('should render correct number of card components', () => {
    expect(wrapper.find(Card).length).toEqual(10);
  });


});
