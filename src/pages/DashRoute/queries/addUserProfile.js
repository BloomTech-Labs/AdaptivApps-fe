import { gql } from 'apollo-boost';

export const ADD_USER_PROFILE = gql`
  mutation AddProfile(
    $email: String!
    $firstName: String
    $lastName: String
    $displayName: String
  ) {
    createProfile(
      data: {
        email: $email
        firstName: $firstName
        lastName: $lastName
        displayName: $displayName
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
