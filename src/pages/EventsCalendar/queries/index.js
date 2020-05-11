import gql from "graphql-tag";

// Getting a list of events, being used in UserDashboard
export const GET_EVENT_LIST = gql`
  query getEvents {
    events {
      id
      type
      host
      speakers
      startTime
      title
      date
      location
      link
      sponsors
      imgUrl
      details
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation deleteEvent($id: ID!) {
    deleteEvent(where: { id: $id }) {
      id
    }
  }
`;
