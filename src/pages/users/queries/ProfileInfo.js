import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

//Query used to obtain user profile information
const PROFILE_INFO = gql`
  {
    profile {
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

  return data.profile(
    ({
      email,
      firstName,
      lastName,
      displayName,
      birthday,
      bio,
      disability,
      legal,
      createdAt,
      updatedAt
    }) => (
      <main key={data.id}>
        <details>
          <p>{email}</p>
          <p>{firstName}</p>
          <p>{lastName}</p>
          <p>{displayName}</p>
          <p>{birthday}</p>
          <p>{bio}</p>
          <p>{disability}</p>
          <p>{legal}</p>
          <p>{createdAt}</p>
          <p>{updatedAt}</p>
        </details>
      </main>
    )
  );
}

export default ProfileInfo;
