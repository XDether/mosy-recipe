import React from 'react';
import renderer from 'react-test-renderer'

import RecipePage from '../../components/pages/RecipePage'

it('renders correctly', () => {
  const tree = renderer.create(<RecipePage />).toJSON();
  expect(tree).toMatchSnapshot();
});
