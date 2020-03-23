import gql from 'graphql-tag';

export const REGISTER_AS_COACH = gql`
  mutation updateActivity(
    $id: ID!,
    $email: String!
  ) {
    updateActivity(
      where: { id: $id }
      data: {
        coaches:{
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