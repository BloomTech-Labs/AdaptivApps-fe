import React from 'react';
import { useQuery } from 'react-apollo';
//import { useMutation } from 'react-apollo';
import ProfileForm from '../forms/ProfileForm';
import { PROFILE_INFO } from '../queries/getProfile';
//import { ADD_USER_PROFILE } from '../queries/createProfile';

const UserDashboard = props => {
  const { user } = props;
  const { data } = useQuery(PROFILE_INFO, {
    variables: { email: user.email },
  });

  const profile = data?.profile;

  // const [profile, setProfile] = useState(data?.profile);
  // const [createProfile] = useMutation(ADD_USER_PROFILE);
  // const newProfile = async () => {
  //   await createProfile({ variables: { email: user.email } });
  // };

  // if (!profile) {
  //   newProfile();
  //   setProfile(user);
  //   console.log('Checking me out');
  //   return <ProfileForm profile={user} user={user} />;
  // } else {
  //   return <ProfileForm profile={profile} user={user} />;
  // }

  if (!profile) {
    return <p>Loading...</p>;
  } else {
    return <ProfileForm profile={profile} user={user} />;
  }
};

export default UserDashboard;
