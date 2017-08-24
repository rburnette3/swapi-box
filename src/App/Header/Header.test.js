import React from 'react';
import Header from './Header'
import { shallow, mount } from 'enzyme'

describe('Header Component', () =>  {
  let wrapper;
  let mockFn;

  beforeEach(() => {
    mockFn = jest.fn();
    wrapper = shallow(<Header counter={0} fetchFromAPI={mockFn} displayFavorites={mockFn} />);
  });

  test('should exist', () => {
    expect(wrapper).toBeDefined();
  });

  test('should have a prop counter of 0', () => {
    expect(wrapper.instance().props.counter).toEqual(0);
  });


  test('should render correct number of html btns', () => {
    expect(wrapper.find('button').length).toEqual(3);
  });

  test('should know that the fetchFromAPI was called when clicked', () => {
    const peopleBtn = wrapper.find('.people-btn')
    expect(peopleBtn.exists()).toEqual(true)
    peopleBtn.simulate('click')
    expect(wrapper.instance().props.fetchFromAPI).toBeCalled();

  });

});
