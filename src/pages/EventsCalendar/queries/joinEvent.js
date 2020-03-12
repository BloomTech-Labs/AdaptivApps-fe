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
`;