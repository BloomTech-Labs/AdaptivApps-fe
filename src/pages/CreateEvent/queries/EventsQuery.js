import gql from 'graphql-tag';

// Creating an event
export const CREATE_EVENT = gql`
  mutation CreateEvent(
    $title: String!
    $startDate: String!
    $endDate: String!
    $location: String!
    $imgUrl: String
    $details: String
  ) {
    createEvent(
      data: {
        title: $title
        startDate: $startDate
        endDate: $endDate
        location: $location
        imgUrl: $imgUrl
        details: $details
      }
    ) {
      id
      title
      startDate
      endDate
      location
      imgUrl
      details
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
    $imgUrl: String
    $details: String
  ) {
    updateEvent(
      data: {
        title: $title
        startDate: $startDate
        endDate: $endDate
        location: $location
        imgUrl: $imgUrl
        details: $details
      }
      where: { id: $id }
    ) {
      title
      startDate
      endDate
      location
      imgUrl
      details
    }
  }
`;
