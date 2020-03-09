import gql from 'graphql-tag';

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateProfile(
    $email: String!
    $firstName: String
    $lastName: String
    $displayName: String
    $birthday: String
    $bio: String
    $disability: String # $legal: Boolean,
  ) {
    updateProfile(
      where: { email: $email }
      data: {
        firstName: $firstName
        lastName: $lastName
        displayName: $displayName
        birthday: $birthday
        bio: $bio
        disability: $disability
        # legal: $legal
      }
    ) {
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

// Creating a profile, being used in UserDashboard
export const ADD_USER_PROFILE = gql`
  mutation createProfile($email: String!) {
    createProfile(data: { email: $email }) {
      email
    }
  }
`;

// Getting a profile, being used in UserDashboard
export const PROFILE_INFO = gql`
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
