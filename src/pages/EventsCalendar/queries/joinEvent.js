import gql from "graphql-tag";

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
      eventProfile {
        id
      }
    }
  }
`;