import gql from 'graphql-tag';

// Retrieves all events a user is registered to.
export const GET_EVENT_DETAILS = gql`
  query getEventDetails($id: ID) {
    events(where: {id: $id}){
      id
      title
      startDate
      endDate
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