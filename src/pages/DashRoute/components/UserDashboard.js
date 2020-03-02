import React, { useEffect } from 'react';
import { useQuery } from 'react-apollo';
import ProfileForm from './subComponents/ProfileForm';
import { PROFILE_INFO } from '../queries/getProfile';
import { useMutation } from 'react-apollo';
import { ADD_USER_PROFILE } from '../queries/createProfile';
import PropTypes from 'prop-types';

const UserDashboard = props => {
  const { user } = props;
  const { loading, error, data } = useQuery(PROFILE_INFO, {
    variables: { email: user.email },
  });

  const profile = data && data.profile;

  const [createProfile] = useMutation(ADD_USER_PROFILE);

  const newProfile = async () => {
    await createProfile({ variables: { email: user.email } });
  };

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
