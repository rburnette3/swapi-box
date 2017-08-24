import React from 'react';
import Card from './Card'
import { shallow, mount } from 'enzyme'

describe('Card Component', () =>  {
  let wrapper;
  let mockFn;
  let mockFavList = [
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

let mockSwapiObj = {
  "Type": "vehicles",
  "Name": "Sail barge",
  "Model": "Modified Luxury Sail Barge",
  "Class": "sail barge",
  "NumOfPassengers": "500"
}

  beforeEach(() => {
    mockFn = jest.fn();
    wrapper = shallow(<Card swapiObj={mockSwapiObj} addToFavorites={mockFn} favoriteList={mockFavList} />);
  });

  test('should exist', () => {
    expect(wrapper).toBeDefined();
  });

  test('should show the vehicle article and none others', () => {
    expect(wrapper.find('.card-vehicle').length).toEqual(1);
    expect(wrapper.find('.card-planet').length).toEqual(0);
    expect(wrapper.find('.card-people').length).toEqual(0);
  });

  test('should render correct number of html controls', () => {
    expect(wrapper.find('li').length).toEqual(3);
  });

  test('should set state correctly on click of display favs', () => {
    const favBtn = wrapper.find('.card-fav-btn');
    expect(favBtn.exists()).toEqual(true)
    favBtn.simulate('click', {target: {classList: {toggle: () => {}}}})
    expect(wrapper.instance().props.addToFavorites).toBeCalled();
  });

});
