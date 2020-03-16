import gql from 'graphql-tag';

// Getting a list of events, being used in UserDashboard
export const GET_EVENT_LIST = gql`
  query getEvents {
    events {
      id
      title
      startDate
      endDate
      location
    }
  }
`;
