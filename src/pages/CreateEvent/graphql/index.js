import gql from "graphql-tag";

export const GET_EVENTS = gql`
  query getEvents {
    events {
      id
    }
  }
`;

export const UPSERT_EVENT = gql`
  mutation upsertEvent(
    $type: String!
    $sportType: String!
    $tags: String!
    $title: String!
    $host: String!
    $coaches: String!
    $speakers: String!
    $date: String!
    $startTime: String!
    $endTime: String!
    $location: String!
    $link: String!
    $sponsors: String!
    $imgUrl: String!
    $details: String!
  ) {
    upsertEvent(
      where: { id: $id }
      create: {
        type: $type
        sportType: $sportType
        tags: $tags
        title: $title
        host: $host
        coaches: $coaches
        speakers: $speakers
        date: $date
        startTime: $startTime
        endTime: $endTime
        location: $location
        link: $link
        sponsors: $sponsors
        imgUrl: $imgUrl
        details: $details
      }
      update: {
        type: $type
        sportType: $sportType
        tags: $tags
        title: $title
        host: $host
        coaches: $coaches
        speakers: $speakers
        date: $date
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
      date
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
    $date: String!
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
        date: $date
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
      date
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
    $type: String!
    $sportType: String!
    $tags: String!
    $title: String!
    $host: String!
    $coaches: String!
    $speakers: String!
    $date: String!
    $startTime: String!
    $endTime: String!
    $location: String!
    $link: String!
    $sponsors: String!
    $imgUrl: String!
    $details: String!
  ) {
    updateEvent(
      data: {
        type: $type
        sportType: $sportType
        tags: $tags
        title: $title
        host: $host
        coaches: $coaches
        speakers: $speakers
        date: $date
        startTime: $startTime
        endTime: $endTime
        location: $location
        link: $link
        sponsors: $sponsors
        imgUrl: $imgUrl
        details: $details
      }
      where: { id: $id }
    ) {
      id
      type
      sportType
      tags
      title
      host
      coaches
      speakers
      date
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
