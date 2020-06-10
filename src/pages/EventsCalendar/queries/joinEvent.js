import gql from "graphql-tag";

// Registers a profile to an event
// export const REGISTER_EVENT = gql`
//   mutation registerEvent($id: ID!, $email: String!) {
//     createParticipant(
//       data: {
//         event: { connect: { id: $id } }
//         eventProfile: { connect: { email: $email } }
//       }
//     ) {
//       id
//     }
//   }
// `;
export const REGISTER_FOR_EVENT = gql`
  mutation registerForEvent(
    $attendeeId: ID!
    $eventId: ID!
    $eventProfile: String!
  ) {
    upsertParticipant(
      where: { id: $attendeeId }
      update: { role: SPECTATOR }
      create: {
        event: { connect: { id: $eventId } }
        eventProfile: { connect: { email: $eventProfile } }
        role: SPECTATOR
      }
    ) {
      id
    }
  }
`;
