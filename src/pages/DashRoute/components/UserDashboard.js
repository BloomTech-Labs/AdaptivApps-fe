import React, { useEffect } from 'react';
import { useQuery } from 'react-apollo';
import ProfileForm from './subComponents/ProfileForm';
import { PROFILE_INFO } from '../queries/getProfile';
import { useMutation } from 'react-apollo';
import { ADD_USER_PROFILE } from '../queries/createProfile';
import PropTypes from 'prop-types';

// Auth0 imports
import { useAuth0 } from '../../../components/auth/react-auth0-spa';

const UserDashboard = () => {
  const { user } = useAuth0();
  const { loading, error, data } = useQuery(PROFILE_INFO, {
    variables: { email: user.email },
  });

  // Extract the profile from returning data of useQuery
  const profile = data && data.profile;

  const [createProfile] = useMutation(ADD_USER_PROFILE);

  // Function that creates a profile for given email
  const newProfile = async () => {
    await createProfile({ variables: { email: user.email } });
  };

  // If user does not have a profile in backend, create one for them
  useEffect(() => {
    if (error) {
      return <p>Error</p>;
    }
    if (!loading && !profile) {
      newProfile();
    }
    // eslint-disable-next-line
  }, [profile]);

  return <ProfileForm profile={profile ? profile : null} user={user} />;
};

export default UserDashboard;

UserDashboard.propTypes = {
  user: PropTypes.object,
};
