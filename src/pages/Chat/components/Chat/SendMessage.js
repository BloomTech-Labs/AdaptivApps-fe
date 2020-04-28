// React imports
import React, {useState, useEffect} from "react";
import { useForm, Controller } from "react-hook-form";

//Styling Imports
import Icon from '@material-ui/core/Icon';

const allMessages = gql`
  query allMessages {
    allMessages {
      id
      text
      createdAt
      sentBy {
        id
        name
      }
    }
  }
`
const sendChat = gql`
  mutation sendChat ($text: String!, $sentById: ID!) {
    createChat(text: $text, sentById: $sentById) {
      id
      text
      createdAt
      sentBy {
        id
        name
      }
    }
  }
`

export default graphql(sendChat, { name: 'sendChatMutation' })(
  graphql(allMessages, { name: 'allMessagesQuery' })(Chat),
)