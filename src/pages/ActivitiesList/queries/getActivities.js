import gql from 'graphql-tag';

// Getting a list of events, being used in UserDashboard
export const GET_EVENT_ACTIVITIES = gql`
  query getEventActivities($id: ID!) {
    event(where: { id: $id }) {
      id
      title
      startDate
      endDate
      location
      imgUrl
      details
      activities {
        id
        name
        startDate
        location
        startTime
      }
    }
  }
`;
