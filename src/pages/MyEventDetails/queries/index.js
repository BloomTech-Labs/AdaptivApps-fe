import gql from "graphql-tag";

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

export const GET_USER_ACTIVITIES = gql`
  query getUserActivities($id: ID!, $email: String!) {
    activities(
      where: {
        event: { id: $id }
        AND: { participants_some: { profile: { email: $email } } }
      }
    ) {
      id
      name
      startDate
      startTime
      location
      link
      details
      event {
        id
        title
        type
        imgUrl
      }
      participants {
        id
        role
        profile {
          id
          email
        }
      }
    }
  }
`;
