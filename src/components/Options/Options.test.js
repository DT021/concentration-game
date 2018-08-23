import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Options from './Options';

describe('Options Component', () => {
  const props = {
    levels: [],
    options: {},
  };
  const component = shallow(<Options {...props} />);

  it('renders', () => {
    expect(toJson(component)).toMatchSnapshot();
  });
});
