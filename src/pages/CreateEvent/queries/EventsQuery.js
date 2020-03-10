import gql from 'graphql-tag';

// Creating an event
export const CREATE_EVENT = gql`
  mutation CreateEvent(
    $title: String!
    $startDate: String!
    $endDate: String!
    $location: String!
  ) {
    createEvent(
      data: {
        title: $title
        startDate: $startDate
        endDate: $endDate
        location: $location
      }
    ) {
      id
      title
      startDate
      endDate
      location
    }
  }
`;

// Updating an event
export const UPDATE_EVENT = gql`
  mutation UpdateEvent(
    $id: ID!
    $title: String!
    $startDate: String!
    $endDate: String!
    $location: String!
  ) {
    updateEvent(
      data: {
        title: $title
        startDate: $startDate
        endDate: $endDate
        location: $location
      }
      where: { id: $id }
    ) {
      title
      startDate
      endDate
      location
    }
  }
`;
