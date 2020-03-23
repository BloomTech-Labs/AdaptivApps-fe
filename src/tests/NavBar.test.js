import React from 'react';
import NavBar from '../pages/Landing/NavBar';
import renderer from 'react-test-renderer';

it('renders side nav correctly', () => {
  const tree = renderer
    .create(<NavBar />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});