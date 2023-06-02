import React from 'react';
import renderer from 'react-test-renderer'

import MainNavigation from '../../components/navigations/MainNavigation';

it('renders correctly', () => {
  const tree = renderer.create(<MainNavigation />).toJSON();
  expect(tree).toMatchSnapshot();
});
