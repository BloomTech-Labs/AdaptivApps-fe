import gql from "graphql-tag";

// Retrieves all events a user is registered to.
export const GET_USER_EVENTS = gql`
  query getUserEvents($email: String!) {
    events(where: { attendees_some: { eventProfile: { email: $email } } }) {
      id
      type
      host
      speakers
      startTime
      title
      startDate
      endDate
      location
      link
      sponsors
      imgUrl
      details
      activities {
        id
        participants {
          id
          activityProfile {
            id
            email
          }
          role
        }
      }
    }
  }
`;

export const GET_ATTENDEES = gql`
  query getAllAttendees($email: String!, $id: ID!) {
    participants(
      where: { eventProfile: { email: $email }, AND: { event: { id: $id } } }
    ) {
      id
    }
  }
`;

export const GET_PARTICIPANTS = gql`
  query getParticipantIds($email: String!, $id: ID!) {
    participants(
      where: {
        activityProfile: { email: $email }
        AND: { activity: { event: { id: $id } } }
      }
    ) {
      id
    }
  }
`;

export const UNREGISTER_FROM_ALL = gql`
  mutation unregisterFromAll(
    $email: String!
    $attendeeId: ID!
    $participantIds: [ID!]
  ) {
    updateProfile(
      where: { email: $email }
      data: {
        activities: { deleteMany: [{ id_in: $participantIds }] }
        events: { delete: { id: $attendeeId } }
      }
    ) {
      id
      activities {
        id
      }
    }
  }
`;

export const UNREGISTER_FROM_EVENT_ACTIVITY = gql`
  mutation unregisterFromEventActivity(
    $email: String!
    $attendeeId: ID!
    $participantId: ID!
  ) {
    updateProfile(
      where: { email: $email }
      data: {
        activities: { delete: { id: $participantId } }
        events: { delete: { id: $attendeeId } }
      }
    ) {
      id
      activities {
        id
      }
    }
  }
`;

export const UNREGISTER_FROM_EVENT = gql`
  mutation unregisterFromEvent($attendeeId: ID!, $email: String!) {
    updateProfile(
      where: { email: $email }
      data: { events: { delete: { id: $attendeeId } } }
    ) {
      id
    }
  }
`;
