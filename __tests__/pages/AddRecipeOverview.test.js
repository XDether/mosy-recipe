import React from 'react';
import renderer from 'react-test-renderer'

import App from '../../components/pages/AddRecipeOverview'

describe('<AddRecipeOverview />', () => {
    it('has 1 child', () => {
      const tree = renderer.create(<App />).toJSON();
      expect(tree.children.length).toBe(4);
    });
});

it('renders correctly', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
