<<<<<<< HEAD
import gql from 'graphql-tag'

//Registers user for an event

export const JOIN_EVENT = gql`
mutation joinEvent($email: String!){
    updateEvent(
     where: {id: $id }
     data: {
         attendees:{
             connect: $email}
             }){
    title
     attendees {
      email
    }
}
}
=======
import gql from 'graphql-tag';

// Registers a profile to an event
export const REGISTER_EVENT = gql`
  mutation registerEvent($id: ID!, $email: String!) {
    updateEvent(
    where: { id: $id }
    data: { attendees: {
        connect: {
            email: $email
        }}}) {
      id
      title
      attendees{
          id
          email
      }
    }
  }
>>>>>>> 92d1a574c672c0935eb6b70f05a37bcf5b29f3ea
`;