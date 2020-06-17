import gql from "graphql-tag";

export const GET_PROFILES = gql`
  query GetProfiles {
    profiles {
      id
      userName
      firstName
      lastName
      extProfile {
        id
        orgName
      }
    }
  }
`;