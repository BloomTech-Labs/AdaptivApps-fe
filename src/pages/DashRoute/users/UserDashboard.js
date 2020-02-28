import React from 'react';
import { useQuery } from 'react-apollo';
import ProfileForm from '../forms/ProfileForm';
import { PROFILE_INFO } from '../queries/getProfile';

const UserDashboard = props => {
  const { user } = props;
  const { loading, error, data } = useQuery(PROFILE_INFO, {
    variables: { email: user.email },
  });
  const newUser = data?.profile;
  if (!newUser) {
    return <p>Loading...</p>;
  }
  return <ProfileForm user={newUser} data={user} />;
};

export default UserDashboard;
