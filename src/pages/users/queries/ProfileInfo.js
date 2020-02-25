import React from 'react';

//imports from apollo
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import {useAuth0} from '../../../components/auth/react-auth0-spa'

//!!Query used to obtain user profile information
const PROFILE_INFO = gql`
  query getProfile($email: String!) {
    profile(where: { email: $email }) {
      email
      firstName
      lastName
      displayName
      birthday
      bio
      disability
      legal
      createdAt
      updatedAt
    }
  }
`;

function ProfileInfo() {
  const { user } = useAuth0();
  const { email } = user;
  const { loading, error, data } = useQuery(PROFILE_INFO, {
    variables: { email: email },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <main>
      <div>
        {console.log(data)}
        <p>{data.profile.email}</p>
        <p>{data.profile.firstName}</p>
        <p>{data.profile.lastName}</p>
        <p>{data.profile.displayName}</p>
        <p>{data.profile.birthday}</p>
        <p>{data.profile.bio}</p>
        <p>{data.profile.disability}</p>
        <p>{data.profile.legal}</p>
        <p>{data.profile.createdAt}</p>
        <p>{data.profile.updatedAt}</p>
      </div>
    </main>
  );
}
export default ProfileInfo;