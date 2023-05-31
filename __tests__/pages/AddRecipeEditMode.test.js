import React from 'react';
import renderer from 'react-test-renderer'

import AddRecipeEditMode from '../../components/pages/AddRecipeEditMode'

it('renders correctly', () => {
  const tree = renderer.create(<AddRecipeEditMode />).toJSON();
  expect(tree).toMatchSnapshot();
});
