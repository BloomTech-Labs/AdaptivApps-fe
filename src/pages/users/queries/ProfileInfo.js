import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

//Query used to obtain user profile information
const PROFILE_INFO = gql`
  {
    profile(where: { id: "ck6veiafj000l0858kc2mb547" }) {
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
//!!Query used to obtain user profile information

function ProfileInfo() {
  const { loading, error, data } = useQuery(PROFILE_INFO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <main>
      <div>
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
