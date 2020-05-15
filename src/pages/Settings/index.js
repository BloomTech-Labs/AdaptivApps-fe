import React, { useEffect } from 'react'
// Auth0 imports
import { useAuth0 } from "../../config/react-auth0-spa";
// Apollo/GraphQL imports
import { useQuery, useMutation } from "react-apollo";
// import ProfileForm from "./ProfileForm";
import { UPDATE_USER_PROFILE, ADD_USER_PROFILE, PROFILE_INFO } from "./queries";

export default function Settings() {
  const { user } = useAuth0();

  const [createProfile] = useMutation(ADD_USER_PROFILE);
  const [updateProfile] = useMutation(UPDATE_USER_PROFILE);

  // Fetch profile for the user using the email associated with auth0 login
  const { loading, error, data } = useQuery(PROFILE_INFO, {
    variables: { email: user && user.email },
  });
  const profile = data && data.profile;

  // Extract the profile from returning data of useQuery
  useEffect(() => {
    if (error) {
      return <p>Error</p>;
    }
    // If user does not have a profile in backend, create one for them
    if (!loading && !profile) {
      newProfile();
    }
    // eslint-disable-next-line
  }, [profile]);

  // Function that creates a profile for given email
  const newProfile = async () => {
    await createProfile({ variables: { email: user.email } });
  };

  return (
    <div>
      <p>Welcome to your settings page!</p>
    </div>
    // <ProfileForm
    //   loading={loading}
    //   profile={profile ? profile : null}
    //   user={user}
    //   updateProfile={updateProfile}
    // />
  )
}
