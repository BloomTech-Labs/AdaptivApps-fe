import gql from "graphql-tag";

// Retrieves the details of a specific event a user is registered to.
export const GET_EVENT_DETAILS = gql`
  query getEventDetails($id: ID!, $email: String!) {
    events(
      where: {
        id: $id
        AND: [{ attendees_some: { eventProfile: { email: $email } } }]
      }
    ) {
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
        date
        location
        startTime
        participants {
          id
          activityProfile {
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
      firstName
      lastName
      email
      notifications {
        id
        label
        chat {
          id
          message
          room {
            id
          }
        }
        announcement {
          id
          title
        }
      }
    }
  }
`;

export const GET_USER_ACTIVITIES = gql`
  query getUserActivities($id: ID!, $email: String!) {
    activities(
      where: {
        event: { id: $id }
        AND: { participants_some: { activityProfile: { email: $email } } }
      }
    ) {
      id
      name
      date
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
        activityProfile {
          id
          email
        }
      }
    }
  }
`;
