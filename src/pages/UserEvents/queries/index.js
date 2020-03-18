import gql from 'graphql-tag';

// Retrieves all events a user is registered to.
export const GET_USER_EVENTS = gql`
  query getUserEvents($email: String!) {
    events(where: {attendees_some: {email: $email}}){
      id
      title
      startDate
      endDate
      imgUrl
      details
    }
  }
`;