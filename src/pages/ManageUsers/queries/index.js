import gql from "graphql-tag";

export const GET_PROFILES = gql`
  query GetProfiles {
    profiles {
      id
      email
      firstName
      lastName
      birthday
      disability
      legal
    }
  }
`;
