import gql from "graphql-tag";

export const GET_MY_PROFILE = gql`
  query getMyProfile($email: String!) {
    profile(where: { email: $email }) {
      id
      firstName
      lastName
      userName
      email
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
        extProfile {
          id
          orgName
        }
      }
    }
  }
`;
