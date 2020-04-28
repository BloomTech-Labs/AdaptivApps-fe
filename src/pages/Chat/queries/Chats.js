import gql from "graphql-tag";

// // Send a chat
// export const SEND_CHAT = gql`
//   mutation sendChat() {
//     createChat() {

//     }
//   }
// `;

// // Update a sent chat
// export const UPDATE_CHAT = gql`
//   mutation updateChat() {
//     updateChat() {

//     }
//   }
// `;

// // Delete a chat
// export const DELETE_CHAT = gql`
//   mutation deleteChat() {
//     deleteChat() {

//     }
//   }
// `;

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