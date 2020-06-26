import gql from "graphql-tag";

export const REGISTER_AS_VOLUNTEER = gql`
  mutation registerAsVolunteer(
    $participantId: ID!
    $email: String!
    $activityId: ID!
  ) {
    upsertParticipant(
      where: { id: $participantId }
      update: { role: VOLUNTEER }
      create: {
        activityProfile: { connect: { email: $email } }
        role: VOLUNTEER
        activity: { connect: { id: $activityId } }
      }
    ) {
      id
      activityProfile {
        id
        email
      }
      role
    }
  }
`;

export const REGISTER_AS_COACH = gql`
  mutation registerAsCoach(
    $participantId: ID!
    $email: String!
    $activityId: ID!
  ) {
    upsertParticipant(
      where: { id: $participantId }
      create: {
        activityProfile: { connect: { email: $email } }
        role: COACH
        activity: { connect: { id: $activityId } }
      }
      update: { role: COACH }
    ) {
      id
      activityProfile {
        id
        email
      }
      role
    }
  }
`;

export const REGISTER_AS_SPECTATOR = gql`
  mutation registerAsSpectator(
    $participantId: ID!
    $email: String!
    $activityId: ID!
  ) {
    upsertParticipant(
      where: { id: $participantId }
      create: {
        activityProfile: { connect: { email: $email } }
        role: SPECTATOR
        activity: { connect: { id: $activityId } }
      }
      update: { role: SPECTATOR }
    ) {
      id
      activityProfile {
        id
        email
      }
      role
    }
  }
`;
export const REGISTER_AS_ATHLETE = gql`
  mutation registerAsAthlete(
    $participantId: ID!
    $email: String!
    $activityId: ID!
  ) {
    upsertParticipant(
      where: { id: $participantId }
      create: {
        activityProfile: { connect: { email: $email } }
        role: ATHLETE
        activity: { connect: { id: $activityId } }
      }
      update: { role: ATHLETE }
    ) {
      id
      activityProfile {
        id
        email
      }
      role
    }
  }
`;
