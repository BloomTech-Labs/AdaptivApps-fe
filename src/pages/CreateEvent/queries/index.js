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
    $id: String!
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

// Creating an activity
export const CREATE_ACTIVITY = gql`
  mutation CreateActivity(
    $event_id: String!
    $name: String!
    $startDate: String!
    $startTime: String!
    $location: String!
    $type: String
    $details: String
  ) {
    createActivity(
      data: {
        name: $name
        startDate: $startDate
        startTime: $startTime
        location: $location
        type: $type
        details: $details
        event: { connect: { id: $event_id } }
      }
    ) {
      id
      name
      startDate
      startTime
      location
      type
      event {
        title
      }
    }
  }
`;
