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

// Creating an event with activities
export const CREATE_EVENT_WITH_ACTIVITIES = gql`
  mutation CreateEvent(
    $title: String!
    $startDate: String!
    $endDate: String!
    $location: String!
    $activities: [Activity!]
  ) {
    createEvent(
      data: {
        title: $title
        startDate: $startDate
        endDate: $endDate
        location: $location
        activities: { create: $activities }
      }
    ) {
      id
      title
      startDate
      endDate
      location
      activities {
        name
        startDate
        startTime
        location
      }
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
