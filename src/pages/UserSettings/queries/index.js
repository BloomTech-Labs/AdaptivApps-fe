import gql from "graphql-tag";

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateProfile(
    $email: String!
    $type: String
    $private: Boolean
    $firstName: String
    $lastName: String
    $displayName: String
    $phoneNumber: String
    $state: String
    $city: String
    $bio: String
    $legal: String
  ) {
    updateProfile(
      where: { email: $email }
      data: {
        type: $type
        private: $private
        firstName: $firstName
        lastName: $lastName
        displayName: $displayName
        phoneNumber: $phoneNumber
        state: $state
        city: $city
        bio: $bio
        legal: $legal
      }
    ) {
      type
      private
      firstName
      lastName
      displayName
      phoneNumber
      state
      city
      bio
      legal
      createdAt
      updatedAt
    }
  }
`;

// Creating a profile
export const ADD_USER_PROFILE = gql`
  mutation createProfile($email: String!) {
    createProfile(data: { email: $email }) {
      email
    }
  }
`;

// Retrieves user profile
export const PROFILE_INFO = gql`
  query getProfile($email: String!) {
    profile(where: { email: $email }) {
      id
      email
      firstName
      lastName
      displayName
      phoneNumber
      state
      city
      bio
      legal
      type
      private
    }
  }
`;

// Updates Organization Profile
export const UPDATE_ORG_PROFILE = gql`
  mutation UpdateOrgProfile(
    $email: String! 
    $phoneNumber: String 
    $city: String 
    $state: String 
    $bio: String 
    $orgName: String 
    $website: String
    ) {
    updateProfile(
      where: { email: $email }
      data: { 
        phoneNumber: $phoneNumber
        city: $city
        state: $state
        bio: $bio
        extProfile: {
          create: {
            orgName: $orgName
            website: $website
          }
        }
      }
    ) {
      id
    }
  }
`;
