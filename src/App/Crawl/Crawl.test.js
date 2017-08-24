import React from 'react';
import Crawl from './Crawl'
import { shallow, mount } from 'enzyme'

describe('Crawl Component', () =>  {
  let wrapper;

  beforeEach(() => {
    let mockCrawl = {
      "roman": "Episode VII",
      "title": "The Force Awakens",
      "year": 2015,
      "crawl": "Luke Skywalker has vanished.\r\nIn his absence, the sinister\r\nFIRST ORDER has risen from\r\nthe ashes of the Empire\r\nand will not rest until\r\nSkywalker, the last Jedi,\r\nhas been destroyed.\r\n \r\nWith the support of the\r\nREPUBLIC, General Leia Organa\r\nleads a brave RESISTANCE.\r\nShe is desperate to find her\r\nbrother Luke and gain his\r\nhelp in restoring peace and\r\njustice to the galaxy.\r\n \r\nLeia has sent her most daring\r\npilot on a secret mission\r\nto Jakku, where an old ally\r\nhas discovered a clue to\r\nLuke's whereabouts...."
    }

    wrapper = shallow(<Crawl crawlObj={mockCrawl} />);
  });

  test('should exist', () => {
    expect(wrapper).toBeDefined();
  });

  test('should be empty obj if no crawl exists', () => {
    wrapper = shallow(<Crawl crawlObj={{}} />);
    expect(Object.keys(wrapper.instance().props.crawlObj).length).toEqual(0);
  });

  test('should display error msg if no crawl exists', () => {
    wrapper = shallow(<Crawl crawlObj={{}} />);
    expect(wrapper.find('div').length).toEqual(2);
  });

  test('should display crawl if exists', () => {
    expect(wrapper.find('.crawl-container').length).toEqual(1);
  });

});
