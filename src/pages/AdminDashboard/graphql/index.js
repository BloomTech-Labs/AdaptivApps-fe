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
        # videoGameFamiliarity
      }
    }
  }
`;

export const GET_EVENTS_ATTENDEES = gql`
  query GetEventAttendees {
    events {
      id
      title
      imgUrl
      startDate
      startTime
      endDate
      location
      attendees {
        id
        eventProfile {
          id
          userName
          firstName
          lastName
          email
          phoneNumber
        }
      }
    }
  }
`;
