import gql from 'graphql-tag';

// Getting a list of events, being used in UserDashboard
export const GET_EVENT_ACTIVITIES = gql`
  query getActivities {
    events {
      activities {
        name
        startDate
        location
        startTime
      }
    }
  }
`;
