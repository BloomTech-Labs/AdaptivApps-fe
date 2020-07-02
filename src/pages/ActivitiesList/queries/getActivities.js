import gql from "graphql-tag";

// Getting a list of events, being used in UserDashboard
export const GET_EVENT_ACTIVITIES = gql`
  query getEventActivities($id: ID!) {
    event(where: { id: $id }) {
      id
      title
      type
      startDate
      endDate
      location
      imgUrl
      details
      host
      coaches
      speakers
      link
      attendees {
        id
        eventProfile {
          id
          email
        }
      }
      activities {
        id
        name
        date
        location
        link
        startTime
        endTime
        type
        details
        participants {
          id
          activityProfile {
            id
            email
          }
          role
        }
      }
    }
  }
`;
