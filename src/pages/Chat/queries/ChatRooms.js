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
  }
`

// Retrieve messages for a user's chat room
export const GET_CHAT_ROOM_MESSAGES = gql`
  query getChatRoomMessages( $email: String! ) {
    profile( where: { email: $email } ){
      chatRooms {
        id
        chats {
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
  }
`

// Search for a chat room
export const SEARCH_CHAT_ROOMS = gql`
  query searchChatRooms( $search: String! ) {
    profiles(where: {
      OR: [
        {
          firstName_contains: $search
        },
        {
          lastName_contains: $search
        }
      ]
      }) {
      chatRooms {
        id
        participants {
          id
          firstName
          lastName
          email
        }
      }  
    }
  }
`

// Create a chat room
export const CREATE_CHAT_ROOM = gql`
  mutation createChatRoom( $email: String! ) {
    createChatRoom( 
      data: { participants: { connect: [
          { email: $email },
          { email: $email }
        ] } }
      ) {
      id
      participants {
        firstName
        lastName
      }
      chats {
        from {
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
        firstName
        lastName
      }
      chats {
        from {
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
        firstName
        lastName
      }
      chats {
        from {
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