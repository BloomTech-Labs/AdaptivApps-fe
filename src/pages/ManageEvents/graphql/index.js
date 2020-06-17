import gql from "graphql-tag";

export const GET_EVENT = gql`
  query getEvent($id: ID!) {
    event(where: { id: $id }) {
      id
      type
      sportType
      tags
      title
      host
      coaches
      speakers
      startDate
      endDate
      startTime
      endTime
      location
      link
      sponsors
      imgUrl
      details
    }
  }
`;

export const CREATE_EVENT = gql`
  mutation createEvent(
    $type: String!
    $sportType: String!
    $tags: String!
    $title: String!
    $host: String!
    $coaches: String!
    $speakers: String!
    $startDate: String!
    $endDate: String!
    $startTime: String!
    $endTime: String!
    $location: String!
    $link: String!
    $sponsors: String!
    $imgUrl: String!
    $details: String!
  ) {
    createEvent(
      data: {
        type: $type
        sportType: $sportType
        tags: $tags
        title: $title
        host: $host
        coaches: $coaches
        speakers: $speakers
        startDate: $startDate
        endDate: $endDate
        startTime: $startTime
        endTime: $endTime
        location: $location
        link: $link
        sponsors: $sponsors
        imgUrl: $imgUrl
        details: $details
      }
    ) {
      id
      type
      sportType
      tags
      title
      host
      coaches
      speakers
      startDate
      endDate
      startTime
      endTime
      location
      link
      sponsors
      imgUrl
      details
    }
  }
`;

export const UPDATE_EVENT = gql`
  mutation updateEvent(
    $id: ID!
    $type: String!
    $sportType: String!
    $tags: String!
    $title: String!
    $host: String!
    $coaches: String!
    $speakers: String!
    $startDate: String!
    $endDate: String!
    $startTime: String!
    $endTime: String!
    $location: String!
    $link: String!
    $sponsors: String!
    $imgUrl: String!
    $details: String!
  ) {
    updateEvent(
      where: { id: $id }
      data: {
        type: $type
        sportType: $sportType
        tags: $tags
        title: $title
        host: $host
        coaches: $coaches
        speakers: $speakers
        startDate: $startDate
        endDate: $endDate
        startTime: $startTime
        endTime: $endTime
        location: $location
        link: $link
        sponsors: $sponsors
        imgUrl: $imgUrl
        details: $details
      }
    ) {
      id
      type
      sportType
      tags
      title
      host
      coaches
      speakers
      startDate
      endDate
      startTime
      endTime
      location
      link
      sponsors
      imgUrl
      details
    }
  }
`;

////////////// Activity Creation ///////////////

export const GET_ACTIVITY = gql`
  query getActivity($id: ID!) {
    activity(where: { id: $id }) {
      id
      name
      type
      sportType
      date
      location
      link
      startTime
      endTime
      details
      coaches
      event {
        id
      }
    }
  }
`;

export const CREATE_ACTIVITY = gql`
  mutation CreateActivity(
    $name: String!
    $type: String!
    $sportType: String!
    $date: String!
    $location: String!
    $link: String
    $startTime: String!
    $endTime: String
    $details: String
    $coaches: String!
    $eventId: ID!
  ) {
    createActivity(
      data: {
        name: $name
        type: $type
        sportType: $sportType
        date: $date
        location: $location
        link: $link
        startTime: $startTime
        endTime: $endTime
        details: $details
        coaches: $coaches
        event: { connect: { id: $eventId } }
      }
    ) {
      id
      name
      type
      sportType
      date
      location
      link
      startTime
      endTime
      details
      coaches
    }
  }
`;

export const GET_ACTIVITIES = gql`
  query getEventActivities($id: ID!) {
    event(where: { id: $id }) {
      id
      title
      startDate
      endDate
      location
      activities {
        id
        name
        type
        sportType
        date
        location
        link
        startTime
        endTime
        details
        coaches
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

export const UPDATE_ACTIVITY = gql`
  mutation UpdateActivity(
    $activityId: ID!
    $name: String!
    $type: String!
    $sportType: String!
    $date: String!
    $location: String
    $link: String
    $startTime: String!
    $endTime: String!
    $coaches: String!
    $details: String
  ) {
    updateActivity(
      data: {
        name: $name
        type: $type
        sportType: $sportType
        date: $date
        location: $location
        link: $link
        startTime: $startTime
        endTime: $endTime
        details: $details
        coaches: $coaches
      }
      where: { id: $activityId }
    ) {
      name
      type
      sportType
      date
      location
      link
      startTime
      endTime
      details
      coaches
      event {
        title
      }
    }
  }
`;

export const GET_TAGS = gql`
  query GetTags {
    tags {
      id
      name
    }
  }
`;

export const CREATE_TAG = gql`
  mutation CreateTag(
    $name: String!
  ) {
    createTag(
      data: {
        name: $name
      }
    ) {
      id
      name
    }
  }
`