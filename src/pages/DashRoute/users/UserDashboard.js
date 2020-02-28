import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-apollo';
import ProfileForm from '../forms/ProfileForm';
import { PROFILE_INFO } from '../queries/getProfile';
import { useMutation } from 'react-apollo';
import { ADD_USER_PROFILE } from '../queries/createProfile';

/*
 * Currently the code runs just fine, fetching data from the backend and displaying them properly
 * However, there are a few warnings
 * To replicate the error, comment out lines 21-25, and uncomment lines 27-45
 */
const UserDashboard = props => {
  const { user } = props;
  const { data } = useQuery(PROFILE_INFO, {
    variables: { email: user.email },
  });

  const profile = data?.profile;

  if (!profile) {
    return <p>Loading...</p>;
  } else {
    return <ProfileForm profile={profile} user={user} />;
  }

  //const [profile, setProfile] = useState(data?.profile);
  //const [email, setEmail] = useState(user.email);

  // const [createProfile] = useMutation(ADD_USER_PROFILE);
  // const newProfile = async () => {
  //   await createProfile({ variables: { email: user.email } });
  // };

  // useEffect(() => {
  //   if (!profile) {
  //     newProfile();
  //   }
  // }, [email]);

  // if (!profile) {
  //   return <ProfileForm profile={user} user={user} />;
  // } else {
  //   return <ProfileForm profile={profile} user={user} />;
  // }
};

export default UserDashboard;
