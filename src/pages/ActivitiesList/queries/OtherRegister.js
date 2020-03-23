import gql from 'graphql-tag';

export const REGISTER_AS_OTHER = gql`
  mutation updateActivity(
    $id: ID!,
    $email: String!
  ) {
    updateActivity(
      where: { id: $id }
      data: {
        other:{
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