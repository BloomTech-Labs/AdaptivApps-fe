import gql from 'graphql-tag';

export const REGISTER_AS_ATHLETE = gql`
  mutation updateActivity($id: ID!, $email: String!) {
    updateActivity(
      where: { id: $id }
      data: {
        participants: {
          create: { profile: { connect: { email: $email } }, role: ATHLETE }
        }
      }
    ) {
      event {
        id
        title
        activities {
          id
          name
          participants {
            profile {
              email
            }
            role
          }
        }
      }
    }
  }
`;

export const REGISTER_AS_COACH = gql`
  mutation updateActivity($id: ID!, $email: String!) {
    updateActivity(
      where: { id: $id }
      data: {
        participants: {
          create: { profile: { connect: { email: $email } }, role: COACH }
        }
      }
    ) {
      event {
        id
        title
        activities {
          id
          name
          participants {
            profile {
              email
            }
            role
          }
        }
      }
    }
  }
`;

export const REGISTER_AS_VOLUNTEER = gql`
  mutation updateActivity($id: ID!, $email: String!) {
    updateActivity(
      where: { id: $id }
      data: {
        participants: {
          create: { profile: { connect: { email: $email } }, role: VOLUNTEER }
        }
      }
    ) {
      event {
        id
        title
        activities {
          id
          name
          participants {
            profile {
              email
            }
            role
          }
        }
      }
    }
  }
`;
export const REGISTER_AS_SPECTATOR = gql`
  mutation updateActivity($id: ID!, $email: String!) {
    updateActivity(
      where: { id: $id }
      data: {
        participants: {
          create: { profile: { connect: { email: $email } }, role: SPECTATOR }
        }
      }
    ) {
      event {
        id
        title
        activities {
          id
          name
          participants {
            profile {
              email
            }
            role
          }
        }
      }
    }
  }
`;
