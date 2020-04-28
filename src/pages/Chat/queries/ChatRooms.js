import gql from "graphql-tag";

// List users Chat Rooms
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