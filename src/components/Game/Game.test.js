import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Game from './Game';

describe('Game Component', () => {
  const props = {
    levels: [],
    options: {},
    setOptions: jest.fn(),
  };
  const component = shallow(<Game {...props} />);

  it('renders', () => {
    expect(toJson(component)).toMatchSnapshot();
  });
});
