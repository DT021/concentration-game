import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Card from './Card';

describe('Card Component', () => {
  const props = {
    onClick: jest.fn(),
    difficulty: 'hard',
    card: {
      symbol: 's',
      discovered: false,
      selected: false
    }
  };
  const component = shallow(<Card {...props} />);

  it('renders', () => {
    expect(toJson(component)).toMatchSnapshot();
  });

  it('calls onClick when card is clicked', () => {
    component.simulate('click');
    expect(props.onClick).toHaveBeenCalled()
  })
});
