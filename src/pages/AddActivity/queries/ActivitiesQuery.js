import gql from 'graphql-tag';

export const GET_ACTIVITIES = gql`
  query GetActivities($id: ID) {
    event(where: { id: $id }) {
      activities {
        id
        name
        startDate
        location
        startTime
        type
        details
      }
    }
  }
`;

export const CREATE_ACTIVITY = gql`
  mutation CreateActivity(
    $name: String!
    $startDate: String!
    $startTime: String!
    $location: String!
    $type: String!
    $details: String
    $event_id: ID
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
      details
      event {
        title
      }
    }
  }
`;

export const UPDATE_ACTIVITY = gql`
  mutation UpdateActivity(
    $id: ID!
    $name: String!
    $startDate: String!
    $startTime: String!
    $location: String!
    $type: String!
    $details: String
  ) {
    updateActivity(
      data: {
        name: $name
        startDate: $startDate
        startTime: $startTime
        location: $location
        type: $type
        details: $details
      }
      where: { id: $id }
    ) {
      id
      name
      startDate
      startTime
      location
      type
      details
      event {
        title
      }
    }
  }
`;
