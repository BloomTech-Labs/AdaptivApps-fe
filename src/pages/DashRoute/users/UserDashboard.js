import React, { useEffect } from 'react';
import { useQuery } from 'react-apollo';
import ProfileForm from '../forms/ProfileForm';
import { PROFILE_INFO } from '../queries/getProfile';
import { useMutation } from 'react-apollo';
import { ADD_USER_PROFILE } from '../queries/createProfile';

const UserDashboard = props => {
  const { user } = props;
  const { loading, error, data } = useQuery(PROFILE_INFO, {
    variables: { email: user.email },
  });

  const profile = data?.profile;

  const [createProfile] = useMutation(ADD_USER_PROFILE);

  const newProfile = async () => {
    await createProfile({ variables: { email: user.email } });
  };

  useEffect(() => {
    if (error) {
      return <p>Error</p>;
    }
    if (!loading && !profile) {
      console.log('Running some mutations and sweat a lot');
      newProfile();
    }
    // eslint-disable-next-line
  }, [profile]);

  return <ProfileForm profile={profile ? profile : null} user={user} />;
};

export default UserDashboard;
