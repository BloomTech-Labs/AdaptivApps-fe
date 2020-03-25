import React from 'react';
import ProfileForm from '../pages/UserProfile/ProfileForm';
import renderer from 'react-test-renderer';

it('renders profile form correctly', () => {
  const tree = renderer
    .create(<ProfileForm />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});