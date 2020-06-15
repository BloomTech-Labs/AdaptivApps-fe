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

// Delete users from a chat room
export const DELETE_CHAT_ROOM_PARTICIPANTS = gql`
  mutation deleteChatRoomParticipants( $id: ID!, $email: String! ) {
    updateChatRoom(
      where: { id: $id } 
      data: { participants: { disconnect: { email: $email } } }
    ) {
      id
      participants {
        id
        firstName
        lastName
      }
      chats {
        id
        from {
          id
          firstName
          lastName
        }
        message
        createdAt
      }
    }
  }
`;

// Add users to chat room
export const ADD_CHAT_ROOM_PARTICIPANTS = gql`
  mutation addChatRoomParticipants( $id: ID!, $email: String! ) {
    updateChatRoom( 
      where: { id: $id } 
      data: { participants: { connect: { email: $email } } }
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
