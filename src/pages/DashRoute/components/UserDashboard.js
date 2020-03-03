import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-apollo';
import ProfileForm from './subComponents/ProfileForm';
import { PROFILE_INFO } from '../queries/getProfile';
import { useMutation } from 'react-apollo';
import { ADD_USER_PROFILE } from '../queries/createProfile';
import PropTypes from 'prop-types';
import { UPDATE_USER_PROFILE } from '../queries/updateProfile';

const UserDashboard = props => {
  const { user } = props;
  // Fetch profile for the user using the email associated with auth0 login

  const [createProfile] = useMutation(ADD_USER_PROFILE);
  const [updateProfile] = useMutation(UPDATE_USER_PROFILE);
  
  const { loading, error, data } = useQuery(PROFILE_INFO, {
    variables: { email: user.email },
  });
  const profile = data && data.profile

  // Extract the profile from returning data of useQuery
  useEffect(() => {
    if (error) {
      return <p>Error</p>;
    }
    if (!loading && !profile) {
      newProfile();
    }
    // eslint-disable-next-line
  }, [profile]);
  
  // Function that creates a profile for given email
  const newProfile = async () => {
    await createProfile({ variables: { email: user.email } });
  };

  // If user does not have a profile in backend, create one for them

  return <ProfileForm profile={profile ? profile : null} user={user} updateProfile={updateProfile} />;
};

export default UserDashboard;

UserDashboard.propTypes = {
  user: PropTypes.object,
};
