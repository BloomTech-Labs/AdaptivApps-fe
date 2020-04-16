import gql from "graphql-tag";
export const UPDATE_AS_VOLUNTEER = gql`
  mutation updateParticipant($id: ID!) {
    updateParticipant(where: { id: $id }, data: { role: VOLUNTEER }) {
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

export const UPDATE_AS_COACH = gql`
  mutation updateParticipant($id: ID!) {
    updateParticipant(where: { id: $id }, data: { role: COACH }) {
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

export const UPDATE_AS_SPECTATOR = gql`
  mutation updateParticipant($id: ID!) {
    updateParticipant(where: { id: $id }, data: { role: SPECTATOR }) {
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
export const UPDATE_AS_ATHLETE = gql`
  mutation updateParticipant($id: ID!) {
    updateParticipant(where: { id: $id }, data: { role: ATHLETE }) {
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
