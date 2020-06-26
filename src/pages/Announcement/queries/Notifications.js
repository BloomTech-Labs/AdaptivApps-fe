import gql from "graphql-tag";

export const GET_NOTIFICATIONS = gql`
    query getNotifications($email: String!) {
      profile(where: {email: $email}) {
      id
      email
      firstName
      lastName
      notifications {
        id
        label
        announcement {
          id
        }
      }
    }
  }
`;

export const CREATE_ANNOUNCEMENT_NOTIFICATION = gql`
  mutation createAnnouncementNotification(
    $email: String!, $label: String!) {
    createNotification(data: {
      profile: {
        connect: {
          email: $email
        }
      }
      label: $label
    }) {
      id
      label
      profile {
        id
        email
        firstName
        lastName
      }
    }
  }
`

export const DELETE_NOTIFICATION = gql`
  mutation deleteNotification( $id: ID! ) {
    deleteNotification( where: { id: $id } ) {
      id
    }
  } 
`

export const NOTIFICATION_SUBSCRIPTION = gql`
  subscription {
    notification {
      mutation
      node {
        id
        label
        announcement {
          id
          notification {
            id
          }
        }
        profile {
          id
          email
          firstName
          lastName
        }
      }
    }
  }
`;


export const GET_ALL_NOTIFICATIONS = gql`
    query {
      notifications {
        id
      }
  }
`;

// To delete all notifications for development:
// Use GET_ALL_NOTIFICATIONS query & DELETE_NOTIFIATION mutation with:
// notifications && notifications.notifications.map(item => deleteNotification({variables: {id: item.id}}))