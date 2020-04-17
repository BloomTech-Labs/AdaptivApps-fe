import gql from "graphql-tag";

export const REGISTER_AS_VOLUNTEER = gql`
  mutation updateActivity($id: ID!, $email: String!) {
    createParticipant(
      data: {
        activity: { connect: { id: $id } }
        profile: { connect: { email: $email } }
        role: VOLUNTEER
      }
    ) {
      id
      activity {
        id
        name
      }
      profile {
        id
        email
      }
      role
    }
  }
`;

export const REGISTER_AS_COACH = gql`
  mutation updateActivity($id: ID!, $email: String!) {
    createParticipant(
      data: {
        activity: { connect: { id: $id } }
        profile: { connect: { email: $email } }
        role: COACH
      }
    ) {
      id
      role
      activity {
        id
        name
      }
      profile {
        id
        email
      }
      role
    }
  }
`;

export const REGISTER_AS_SPECTATOR = gql`
  mutation updateActivity($id: ID!, $email: String!) {
    createParticipant(
      data: {
        activity: { connect: { id: $id } }
        profile: { connect: { email: $email } }
        role: SPECTATOR
      }
    ) {
      id
      role
      activity {
        id
        name
      }
      profile {
        id
        email
      }
      role
    }
  }
`;
export const REGISTER_AS_ATHLETE = gql`
  mutation updateActivity($id: ID!, $email: String!) {
    createParticipant(
      data: {
        activity: { connect: { id: $id } }
        profile: { connect: { email: $email } }
        role: ATHLETE
      }
    ) {
      id
      role
      activity {
        id
        name
      }
      profile {
        id
        email
      }
      role
    }
  }
`;
