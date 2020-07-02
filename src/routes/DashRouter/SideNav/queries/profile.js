import gql from "graphql-tag";

export const GET_MY_PROFILE = gql`
  query getMyProfile($email: String!) {
    profile(where: { email: $email }) {
      id
      firstName
      lastName
      userName
      email
      legal
    }
  }
`;

export const PROFILE_SUBSCRIPTION = gql`
  subscription {
    profile {
      mutation
      node {
        id
        firstName
        lastName
        type
        email
        legal
        extProfile {
          id
          orgName
        }
      }
    }
  }
`;
