// React imports
import React from "react";
import TextContainer from "./components/TextContainer/TextContainer";
// Auth0 imports
import { useAuth0 } from "../../config/react-auth0-spa";

// import NavBar from "./NavBar";
import InfoBar from './components/InfoBar/InfoBar';
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