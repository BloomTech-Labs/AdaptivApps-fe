import gql from 'graphql-tag';

// Retrieves all events a user is registered to.
export const GET_USER_EVENTS = gql`
  query getUserEvents($email: String!) {
    events(where: { attendees_some: { email: $email } }) {
      id
      title
      startDate
      endDate
      location
      imgUrl
      details
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
