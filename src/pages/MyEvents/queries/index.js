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
    $id: ID!
    $participantIds: [ID!]
  ) {
    updateProfile(
      where: { email: $email }
      data: {
        activities: { deleteMany: [{ id_in: $participantIds }] }
        events: { disconnect: { id: $id } }
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
    $id: ID!
    $participantId: ID!
  ) {
    updateProfile(
      where: { email: $email }
      data: {
        activities: { delete: { id: $participantId } }
        events: { disconnect: { id: $id } }
      }
    ) {
      id
      activities {
        id
      }
    }
  }
`;
// export const UNREGISTER_FROM_EVENT = gql`
//   mutation unregisterFromEvent($id: ID!, $email: String!) {
//     updateEvent(
//       where: { id: $id }
//       data: { attendees: { disconnect: { email: $email } } }
//     ) {
//       id
//     }
//   }
// `;

export const UNREGISTER_FROM_EVENT = gql`
  mutation unregisterFromEvent($id: ID!, $email: String!) {
    updateProfile(
      where: { email: $email }
      data: { events: { disconnect: { id: $participantId } } }
    ) {
      id
    }
  }
`;
