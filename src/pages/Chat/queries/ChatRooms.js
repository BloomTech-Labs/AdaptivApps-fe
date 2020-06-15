import gql from "graphql-tag";

// List all chat rooms for a user and get list of all previous recipients
export const GET_CHAT_ROOMS = gql`
  query getChatRooms($email: String!) {
    profile(where: { email: $email }) {
      id
      chatRooms {
        id
        participants {
          id
          email
          firstName
          lastName
        }
        chats {
          id
          message
          createdAt
          from {
            id
            email
            firstName
            lastName
          }
        }
     }
  }
}
`;


// Create a chat room
export const CREATE_CHAT_ROOM = gql`
  mutation createChatRoom($useremail: String!, $recipientemail: String!) {
    createChatRoom(
      data: {
        participants: {
          connect: [{ email: $useremail }, { email: $recipientemail }]
        }
      }
    ) {
      id
      participants {
        id
        email
        firstName
        lastName
      }
      chats {
        id
        message
        createdAt
        from {
          id
          email
          firstName
          lastName
        }
      }
    }
  }
`;

// Delete a chat room
export const DELETE_CHAT_ROOM = gql`
  mutation deleteChatRoom($id: ID!) {
    deleteChatRoom(where: { id: $id }) {
      id
    }
  }
`;

// Chat room subscription
export const CHAT_ROOM_SUBSCRIPTION = gql`
  subscription chatRoomSubscription {
    chatRoom {
      mutation
      node {
        id
        participants {
          firstName
          lastName
        }
        chats {
          from {
            id
            email
            firstName
            lastName
          }
          message
          createdAt
        }
      }
    }
  }
`;
