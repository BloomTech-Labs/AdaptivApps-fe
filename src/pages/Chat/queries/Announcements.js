import gql from "graphql-tag";

// Retrieve announcements
export const GET_ANNOUNCEMENTS = gql`
  query getAnnouncements( $isAnnouncementRoom: Boolean! ) {
    announcements(where: {isAnnouncementRoom: $isAnnouncementRoom}) {
        title
        message
        createdAt
        isAnnouncementRoom
    }
  }
`

export const CREATE_ANNOUNCEMENT = gql`
	mutation createAnnouncement ($title: String!, $message: String!, $isAnnouncementRoom: Boolean!) {
        createAnnouncement(
            data: {
                title: $title
                message: $message
                isAnnouncementRoom: $isAnnouncementRoom
            }
        ) {
            id
            message
            title
            createdAt
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