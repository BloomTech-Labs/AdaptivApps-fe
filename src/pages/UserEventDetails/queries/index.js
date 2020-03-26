import gql from 'graphql-tag';

// Retrieves the details of a specific event a user is registered to.
export const GET_EVENT_DETAILS = gql`
  query getEventDetails($id: ID!, $email: String!) {
    events(where: { id: $id, AND: [{ attendees_some: { email: $email } }] }) {
      id
      title
      startDate
      endDate
      details
      location
      imgUrl
      activities {
        id
        name
        startDate
        location
        startTime
        endTime
        type
        details
        athletes {
          id
        }
        coaches {
          id
        }
        volunteers {
          id
        }
        other {
          id
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
