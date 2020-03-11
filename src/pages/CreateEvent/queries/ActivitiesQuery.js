import gql from 'graphql-tag';

export const GET_ACTIVITIES = gql`
  query GetActivities($id: ID) {
    event(where: { id: $id }) {
      activities {
        name
        startDate
        location
        startTime
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
      event {
        title
      }
    }
  }
`;
