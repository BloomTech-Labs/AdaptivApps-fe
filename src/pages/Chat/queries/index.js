import gql from "graphql-tag";

// Retrieve a list of all contacts
export const GET_CONTACTS = gql`
  query getContacts {
    profiles {
      firstName
      lastName
      id
      email
      bio
    }
  }
`;

export const DELETE_NOTIFICATION = gql`
  mutation deleteNotification($id: ID!) {
    deleteNotification(where: {id: $id}) {
      id
    }
  } 
`