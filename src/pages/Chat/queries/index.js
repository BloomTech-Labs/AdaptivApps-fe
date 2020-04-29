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