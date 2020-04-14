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
        role
        profile {
          id
          email
        }
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
