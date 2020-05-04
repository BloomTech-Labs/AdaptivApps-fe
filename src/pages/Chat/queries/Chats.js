import gql from "graphql-tag";

// Send a chat
export const SEND_CHAT = gql`
  mutation sendChat( $id: ID!, $email: String!, $message: String! ) {
    createChat(
      data: {
        from: {
          connect: {
            email: $email
          }
        }
        message: $message
        room: {
          connect: {
            id: $id
          }
        }
      }
    ) {
      id
      from {
        firstName
        lastName
      }
      message
      createdAt
      room {
        id
      }
    }
  }
`;

// Update a sent chat
export const UPDATE_CHAT = gql`
  mutation updateChat( $id: ID!, $message: String! ) {
    updateChat(
      where: { id: $id }
      data: { message: $message }
    ) {
      id
      from {
        firstName
        lastName
      }
      message
      createdAt
      room {
        id
      }
    }
  }
`;

// Delete a chat
export const DELETE_CHAT = gql`
  mutation deleteChat( $id: ID! ) {
    deleteChat( where: { id: $id } ) {
      id
    }
  }
`;

// Retrieve a list of recent recipients the user has sent a chat to
export const GET_RECENT_RECIPIENTS = gql`
  query getRecentRecipients( $email: String! ) {
    profile( where: { email: $email } ) {
      chatRooms {
        id
        participants {
          firstName
          lastName
        }
        chats {
          createdAt
        }
      }
    }
  }
`;

// Retrieve a list of recipients
export const GET_RECIPIENTS = gql`
  query getRecipients {
    profiles {
      id
      firstName
      lastName
    }
  }
`;

// Chat subscription
export const CHAT_SUBSCRIPTION = gql`
  subscription chatSubscription {
    chat {
      mutation
      node {
        id
        message
        createdAt
        room {
          id
        }
        from {
          firstName
          lastName
        }
      }
    }
  }
`;