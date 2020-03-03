import gql from 'graphql-tag';

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
