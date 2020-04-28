import gql from "graphql-tag";

// List all chat rooms for a user
export const GET_CHAT_ROOMS = gql`
  query getChatRooms($email: String!) {
    profile(where: {email: $email}) {
      chatRooms {
        id
        participants {
          firstName
          lastName
        }
      }      
    }
  }
`

// Retrieve messages for a user's chat room
export const GET_CHAT_ROOM_MESSAGES = gql`
  query getChatRoomMessages($email: String!) {
    profile(where: {email: $email}){
      chatRooms {
        id
        chats {
          message
          createdAt
          room
          from {
            firstName
            lastName
          }
        }
      }  
    }
  }
`

// Delete a chat room
export const DELETE_CHAT_ROOM = gql`
  mutation deleteChatRoom() {
    deleteChatRoom() {
      
    }
  }
`;

// Add users to a chat room
export const ADD_CHAT_ROOM_PARTICIPANTS = gql`
  mutation addChatRoomParticipants() {
    updateChatRoom() {

    }
  }
`;

// Delete users from a chat room
export const DELETE_CHAT_ROOM_PARTICIPANTS = gql`
  mutation deleteChatRoomParticipants() {
    updatedChatRoom() {

    }
  }
`;