import gql from 'graphql-tag';

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
      }
    }
  }
`;

export const UNREGISTER_FROM_ACTIVITY = gql`
  mutation unregisterFromActivity($id: ID!, $id: ID!) {
    updateActivity(
      where: { id: $id }
      data: { participants: { delete: { id: $id } } }
    ) {
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
`;

export const GET_USER_ACTIVITIES = gql`
  query getUserActivities($email: String!) {
    activities(where: { participants_some: { profile: { email: $email } } }) {
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
`;
