import gql from "graphql-tag";

// Retrieves all events a user is registered to.
export const GET_USER_EVENTS = gql`
  query getUserEvents($email: String!) {
    events(where: { attendees_some: { email: $email } }) {
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
          profile {
            id
            email
          }
          role
        }
      }
    }
  }
`;

// Unregister(delete) event user is registered for.
export const UNREGISTER_FROM_EVENT = gql`
  mutation unregisterFromEvent($id: ID!, $email: String!) {
    updateProfile(
      where: { email: $email }
      data: { events: { disconnect: { id: $id } } }
    ) {
      id
      events {
        id
        activities {
          id
          participants {
            id
            profile {
              id
              email
            }
            role
          }
        }
      }
    }
  }
`;

export const GET_PARTICIPANT_IDS = gql`
  query getParticipantIds($email: String!, $id: ID!){
    participants(where: {profile: {email: $email}, AND: {activity: {event: {id: $id}}}}){
      id
    }
  }
`;

export const UNREGISTER_FROM_ALL = gql`
mutation unregisterFromEventActivities($email: String!, $id: ID!, $participantIds: ID!){
    updateProfile(where: {email: $email}
   	data: {events: {disconnect: {id: $id}}
      activities: {deleteMany: [{id: $participantIds }]}}){
     id
     activities{
      id
     }
    }
  }
`;
// export const UNREGISTER_FROM_ACTIVITY = gql`
//   mutation unregisterFromActivity($activityId: ID!, $participantId: ID!) {
//     updateActivity(
//       where: { id: $activityId }
//       data: { participants: { delete: { id: $participantId } } }
//     ) {
//       id
//       participants {
//         id
//         profile {
//           id
//           email
//         }
//         role
//       }
//     }
//   }
// `;

// export const GET_USER_ACTIVITIES = gql`
//   query getUserActivities($email: String!) {
//     activities(where: { participants_some: { profile: { email: $email } } }) {
//       id
//       event {
//         id
//       }
//       participants {
//         id
//         profile {
//           id
//           email
//         }
//         role
//       }
//     }
//   }
// `;
// // ck8y40vmv05770737g5uftumb
