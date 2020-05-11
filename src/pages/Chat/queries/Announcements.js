import gql from "graphql-tag";

// Retrieve announcements
export const GET_ANNOUNCEMENTS = gql`
  query getAnnouncements( $isAnnouncementRoom: boolean! ) {
    announcements {
        participants {
            firstName
            lastName
            email
        }
        title
        message
        createdAt
        isAnnouncementRoom
    }
  }
`

// Announcement subscription
export const ANNOUNCEMENT_SUBSCRIPTION = gql`
  subscription announcementSubscription {
    announcement {
      mutation
      node {
        id
        title
        message
        createdAt
        participants {
            email
            firstName
            lastName
        }
        isAnnouncementRoom
      }
    }
  }
`;