import gql from 'graphql-tag';

// Registers a profile to an event
export const REGISTER_EVENT = gql`
  mutation registerEvent($id: ID!) {
    updateEvent(where: { id: $id }
    data: { attendees: {
        connect: {
            email: $email
        }}}) {
      title
      attendees{
          email
      }
    }
  }
`;