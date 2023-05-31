import React from 'react';
import renderer from 'react-test-renderer'

import RecipesOverview from '../../components/pages/RecipesOverview'

it('renders correctly', () => {
  const tree = renderer.create(<RecipesOverview />).toJSON();
  expect(tree).toMatchSnapshot();
});
