import gql from "graphql-tag";

export const GET_USERS = gql`
  query GetUsers {
    profiles {
      id
      email
      firstName
      lastName
      city
      state
      postalCode
      country
      address1
      address2
      extProfile {
        id
        gender
        tShirtSize
        birthday
      }
      demographicProfile {
        id
        virtualRide
        virtualRidePlatforms
        xBoxGamePass
        videoGameFamiliarity
      }
    }
  }
`;
