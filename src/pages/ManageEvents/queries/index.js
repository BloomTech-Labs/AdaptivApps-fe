import gql from 'graphql-tag';

export const GET_EVENTS = gql`
  query GetEvents {
    events {
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
        type
        details
      }
    }
  }
`;

export const GET_ONE_EVENT = gql`
  query GetOneEvent($id: ID) {
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
        type
        details
      }
    }
  }
`;

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

export const DELETE_ACTIVITY = gql`
  mutation DeleteActivity($id: ID!) {
    deleteActivity(where: { id: $id }) {
      id
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(where: { id: $id }) {
      id
    }
  }
`;
