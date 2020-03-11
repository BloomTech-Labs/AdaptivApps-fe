import gql from 'graphql-tag';

// Getting a list of events, being used in UserDashboard
export const GET_EVENT_ACTIVITIES = gql`
  query getEventActivities {
    events {
      id
      activities {
        name
        startDate
        location
        startTime
      }
    }
  }
`;
