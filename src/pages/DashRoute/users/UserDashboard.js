import React from 'react';
import { useQuery } from 'react-apollo';
import ProfileForm from '../forms/ProfileForm';
import { PROFILE_INFO } from '../queries/getProfile';

const UserDashboard = props => {
  const { user } = props;
  console.log('User email really is', user.email);
  const { loading, error, data } = useQuery(PROFILE_INFO, {
    variables: { email: user.email },
  });
  console.log('Are there data?', data?.profile);
  const newUser = data?.profile;
  if (!newUser) {
    return <p>Loading...</p>;
  }
  return <ProfileForm user={newUser} />;
};

export default UserDashboard;
