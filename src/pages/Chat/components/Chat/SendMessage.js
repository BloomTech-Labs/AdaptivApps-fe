// React imports
import React, {useState, useEffect} from "react";
import { useForm, Controller } from "react-hook-form";

//Styling Imports
import {
    makeStyles,
    Container,
    Typography,
    Box,
    InputLabel,
    TextField,
    Select,
    MenuItem,
    Button,
  } from "@material-ui/core";
import Icon from '@material-ui/core/Icon';



const createMessage = gql`
  mutation sendMessage($text: String!, $sentById: ID!) {
    sendMessage(text: $text, sentById: $sentById) {
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