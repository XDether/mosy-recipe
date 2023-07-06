import React from 'react';
import renderer from 'react-test-renderer'

import CategoryScreen from '../../components/pages/CategoryScreen'

it('renders correctly', () => {
  const tree = renderer.create(<CategoryScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
