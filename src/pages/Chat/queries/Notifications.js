import gql from "graphql-tag";

// Get notifications
export const GET_NOTIFICATIONS = gql`
  query getNotifications ( $email: String! ) {
    profile ( where: { email: $email } ) {
      firstName
      lastName
      email
      notifications {
        label
      }
    }
  }
`;

// Delete notification
export const DELETE_NOTIFICATION = gql`
  mutation deleteNotification( $id: ID! ) {
    deleteNotification( where: { id: $id } ) {
      id
    }
  } 
`

// Notification subscription
export const NOTIFICATION_SUBSCRIPTION = gql`
  subscription notificationSubscription {
    notification {
      mutation
      node {
        id
        label
        announcement {
          title
          message
        }
        chat {
          id
          message
        }    
      }
    } 
  }
`;