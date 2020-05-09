import gql from "graphql-tag";

// Registers a profile to an event
export const REGISTER_EVENT = gql`
  mutation registerEvent($id: ID!, $email: String!) {
    createParticipant(
      data: {
        event: { connect: { id: $id } }
        eventProfile: { connect: { email: $email } }
      }
    ) {
      id
    }
  }
`;
