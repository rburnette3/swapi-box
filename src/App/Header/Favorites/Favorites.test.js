import React from 'react';
import Favorites from './Favorites'
import { shallow, mount } from 'enzyme'

describe('Favorites Component', () =>  {
  let wrapper;
  let mockFn;

  beforeEach(() => {
    mockFn = jest.fn();
    wrapper = shallow(<Favorites counter={3} displayFavorites={mockFn} />);
  });

  test('should exist', () => {
    expect(wrapper).toBeDefined();
  });

  test('should set state correctly on click of display favs', () => {

    const favBtn = wrapper.find('.favorites-btn');
    expect(favBtn.exists()).toEqual(true)
    favBtn.simulate('click')
    expect(wrapper.instance().props.displayFavorites).toBeCalled();
  });

  test('should render correct number of html controls', () => {
    expect(wrapper.find('div').length).toEqual(3);
  });

  test('should render button text correctly', () => {
    expect(wrapper.find('.favorites-btn').text()).toEqual('Favorites 3');
  });

});
