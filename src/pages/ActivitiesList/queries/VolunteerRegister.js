import gql from 'graphql-tag';

export const REGISTER_AS_VOLUNTEER = gql`
  mutation updateActivity(
    $id: ID!,
    $email: String!
  ) {
    updateActivity(
      where: { id: $id }
      data: {
        volunteers:{
            connect: {
                email: $email
            }}}) {
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