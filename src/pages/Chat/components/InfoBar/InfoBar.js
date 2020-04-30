import React, {useEffect} from "react";
import config from "../../../../config/auth_config";
import { useQuery } from "react-apollo";
import { GET_CHAT_ROOMS } from '../../queries/ChatRooms';
import ChatRoom from './ChatRoom';

// Style Imports
import CreateIcon from '@material-ui/icons/Create';
import LanguageIcon from '@material-ui/icons/Language';
import {
    withStyles,
    makeStyles,
    Button
  } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
    root: {
      display: "flex",
      flexDirection: "column",
      border: "none",
    },
}));

const MessageDiv = withSyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    color: 'grey'
  }
})

function InfoBar({ user }) {
    const classes = useStyles();
    const { loading, error, data, refetch } = useQuery(GET_CHAT_ROOMS, { variables: { email: user.email } });
    
    // refetches CHAT_ROOMS without refreshing page
    useEffect(() => {
        refetch();
    }, [refetch]);

    if (loading) return <CircularProgress className={classes.loadingSpinner} />;
    if (error) return `Error! ${error.message}`;

    const newMessageClick = e => {
      e.preventDefault();
      console.log('New message clicked')
    };

    const newAnnouncementClick = e => {
      e.preventDefault();
      console.log('New announcement clicked')
    }
  
    return (
      <div>
        <MessageDiv>
          <h1>Messages</h1>
          <CreateIcon onClick={newMessageClick} /> New Message
          {user && user[config.roleUrl].includes("Admin") ? (
            <>
              <LanguageIcon onClick={newAnnouncementClick}/> New Announcement
            </>
          ): null}
        </MessageDiv>

        <div>
          {data && data?.profile.chatRooms?.map((chatRoom, id) => (
            <ChatRoom chatRoom={chatRoom} key={id} user={user}/>
          ))}
        </div>
      </div>
    )
}

export default InfoBar;