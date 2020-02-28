import { gql } from 'apollo-boost';

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
