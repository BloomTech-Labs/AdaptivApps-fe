import gql from 'graphql-tag';

// Retrieves the details of a specific event a user is registered to.
export const GET_EVENT_DETAILS = gql`
  query getEventDetails($id: ID!, $email: String!) {
    events(where: { id: $id, AND: [{ attendees_some: { email: $email } }] }) {
      id
      type
      title
      host
      speakers
      sponsors
      startTime
      startDate
      endDate
      details
      location
      link
      imgUrl
      activities {
        id
        name
        startDate
        location
        link
        startTime
        endTime
        type
        details
        participants {
          id
          profile {
            id
            email
          }
          role
        }
      }
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query getUserProfile($email: String!) {
    profile(where: { email: $email }) {
      id
    }
  }
`;
