import gql from "graphql-tag";

// List all chat rooms for a user and get list of all previous recipients
export const GET_CHAT_ROOMS = gql`
  query getChatRooms( $email: String! ) {
    profile( where: { email: $email } ) {
      chatRooms {
        id
        participants {
          firstName
          lastName
          displayName
          email
          id
        }
        chats(orderBy: createdAt_DESC) {
          id
          message
          createdAt
          notification {
            label
            id
          }
          room {
            id
          }
          from {
            id
            firstName
            lastName
            email
          }
        }
      }
      notifications {
          label
          profile {
            id
            email
            firstName
            lastName
          }
        }      
    }
  }
`

// Retrieve messages for a user's chat room
export const GET_CHAT_ROOM_MESSAGES = gql`
  query getChatRoomMessages( $email: String! ) {
    profile( where: { email: $email } ){
      chatRooms {
        id
        chats {
          id
          message
          createdAt
          room {
            id
          }
          from {
            id
            firstName
            lastName
          }
        }
      }  
    }
  }
`

// Create a chat room
export const CREATE_CHAT_ROOM = gql`
  mutation createChatRoom( $useremail: String!, $recipientemail: String! ) {
    createChatRoom( 
      data: { participants: { connect: [
          { email: $useremail },
          { email: $recipientemail }
        ] } }
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
          email
          firstName
          lastName
        }
        message
        createdAt
      }
    }
  }
`;

// Delete a chat room
export const DELETE_CHAT_ROOM = gql`
  mutation deleteChatRoom( $id: ID! ) {
    deleteChatRoom( where: { id: $id } ) {
      id
    }
  }
`;

// Add users to a chat room
export const ADD_CHAT_ROOM_PARTICIPANTS = gql`
  mutation addChatRoomParticipants( $id: ID!, $email: String! ) {
    updateChatRoom( 
      where: { id: $id } 
      data: { participants: { connect: { email: $email } } }
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

// Chat room subscription
export const CHAT_ROOM_SUBSCRIPTION = gql`
  subscription {
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