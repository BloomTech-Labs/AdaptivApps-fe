import React, {useEffect} from "react";
import config from "../../../../config/auth_config";
import { useQuery } from "react-apollo";
import { GET_CHAT_ROOMS } from '../../queries/ChatRooms';
import ChatRoom from './ChatRoom';

// Style Imports
import CreateIcon from '@material-ui/icons/Create';
import LanguageIcon from '@material-ui/icons/Language';
import {
    Container,
    makeStyles,
    Button
  } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";



const useStyles = makeStyles(theme => ({
    root: {
      display: "flex",
      flexDirection: "column",
      maxWidth: '40%'   
    },
    header: {
      fontSize: '2rem',
      fontFamily: 'Arial',
      fontWeight: "normal",
      color: "#2962FF",
      marginTop: "0"
    },
    iconDiv: {
      display: "flex",
      justifyContent: "flex-start",
      paddingLeft: "12.5%",
      paddingTop: "1%",
      "&:hover": {
        background: "lightgrey",
        cursor: "pointer",
        borderRadius: "5px"
      }
    },
    icons: {
      fontSize: '2rem',
      color: 'grey',
      margin: "2% 1% 0 1%"
    },
    span: {
      fontSize: '1.5rem',
      color: 'grey',
      padding: "2%",
      marginBottom: "1%"
    }
}));


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
        <div>
          <h1 className={classes.header}>Messages</h1>
          <div className={classes.iconDiv}>
            <CreateIcon onClick={newMessageClick} className={classes.icons} />
            <span className={classes.span}>New Message</span>
          </div>
          {user && user[config.roleUrl].includes("Admin") ? (
            <div className={classes.iconDiv}>
              <LanguageIcon onClick={newAnnouncementClick} className={classes.icons} />
              <span className={classes.span}>New Announcement</span> 
            </div>
          ): null}
        </div>

        <div>
          {data && data?.profile.chatRooms?.map((chatRoom, id) => (
            <ChatRoom chatRoom={chatRoom} key={id} user={user}/>
          ))}
        </div>
      </div>
    )
}

export default InfoBar;