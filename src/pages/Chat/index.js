// React imports
import React, {useEffect} from "react";
import TextContainer from "./components/TextContainer/TextContainer";
// Auth0 imports
import { useAuth0 } from "../../config/react-auth0-spa";

// import NavBar from "./NavBar";
import InfoBar from './components/InfoBar/InfoBar';
import { GET_CHAT_ROOM_MESSAGES } from './queries/ChatRooms'
import Messages from './components/Messages/Messages'
import { useQuery } from 'react-apollo';

import {
  makeStyles,
  Container,
  Box,
  Button,
  Typography,
} from "@material-ui/core";
import ReactDOM from 'react-dom';


function ChatFeature(){
  const { user } = useAuth0();

  
 
  return (
    <div>
      <InfoBar user={user} />
      <TextContainer />
    </div>
  )
}

export default ChatFeature;