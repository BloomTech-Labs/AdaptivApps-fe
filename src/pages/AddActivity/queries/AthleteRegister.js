import gql from 'graphql-tag';

export const REGISTER_AS_ATHLETE = gql`
  mutation UpdateActivity(
    $id: ID!,
    $email: String!
  ) {
    updateActivity(
      where: { id: $id }
      data: {
        athletes:{
            connect: {
                email: $email
            }
        }
      }
    ) {
      id
      name
     athletes{
         email
     }
      event {
        title
      }
    }
  }
`;