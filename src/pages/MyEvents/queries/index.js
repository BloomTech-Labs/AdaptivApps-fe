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


export const GET_PARTICIPANT_IDS = gql`
  query getParticipantIds($email: String!, $id: ID!){
    participants(where: {profile: {email: $email}, AND: {activity: {event: {id: $id}}}}){
      id
    }
  }
`;

export const UNREGISTER_FROM_ALL = gql`
mutation unregisterFromEventActivities($email: String!, $id: ID!, $participantIds: [ID!]){
    updateProfile(where: {email: $email}
   	data: {events: {disconnect: {id: $id}}
      activities: {deleteMany: [{id_in: $participantIds }]}}){
     id
     activities{
      id
     }
    }
  }
`;

