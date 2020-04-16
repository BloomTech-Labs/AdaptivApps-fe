import gql from 'graphql-tag';

export const GET_REGISTERED_ACTIVITY = gql`
  query getRegisteredActivity($id: ID, $email: String!) {
    activities(
      where: {
        event: { id: $id }
        AND: { participants_some: { profile: { email: $email } } }
      }
    ) {
      id
      name
      event {
        id
        title
        type
      }
      participants {
        id
        activity {
          id
        }
        role
        profile {
          id
          email
        }
      }
    }
  }
`;

export const GET_PARTICIPANT = gql`
  query getParticipant($id: ID!, $email: String!) {
    participants(
      where: { activity: { id: $id }, AND: { profile: { email: $email } } }
    ) {
      id
      activity {
        id
      }
      profile {
        email
      }
      role
    }
  }
`;
