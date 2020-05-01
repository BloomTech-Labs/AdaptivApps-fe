
import React, {useEffect, useState} from "react";
import { styled } from '@material-ui/core/styles';
import { useQuery } from "react-apollo";
import { GET_CHAT_ROOMS, CHAT_ROOM_SUBSCRIPTION } from '../../queries/ChatRooms';

import RecipientModal from './Modal';
import ChatRoom from './ChatRoom';

//Auth0 imports
import config from "../../../../config/auth_config";

// Style Imports
import CreateIcon from '@material-ui/icons/Create';
import LanguageIcon from '@material-ui/icons/Language';

import {
    Container,
    makeStyles,
    Button,
    Icon,
    Box,
    TextField

  } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import MenuIcon from "@material-ui/icons/Menu";


const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    maxWidth: '40%'   
  },
  header: {
    fontSize: '2.5rem',
    color: 'grey',
    fontFamily: 'Arial',
  },
  icons: {
    fontSize: '4rem',
    color: 'grey',
    padding: "0%",
    cursor: "pointer",
  },
  span: {
    fontSize: '2rem',
    color: 'grey',
    cursor: 'pointer'
  },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: "-webkit-xxx-large",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    }
    // root: {
    //   display: "flex",
    //   flexDirection: "column",
    //   maxWidth: '40%'   
    // },
    // header: {
    //   fontSize: '2rem',
    //   fontFamily: 'Arial',
    //   fontWeight: "normal",
    //   color: "#2962FF",
    //   marginTop: "0"
    // },
    // iconDiv: {
    //   display: "flex",
    //   justifyContent: "flex-start",
    //   paddingLeft: "12.5%",
    //   paddingTop: "1%",
    //   "&:hover": {
    //     background: "lightgrey",
    //     cursor: "pointer",
    //     borderRadius: "5px"
    //   }
    // },
    // icons: {
    //   fontSize: '2rem',
    //   color: 'grey',
    //   margin: "2% 1% 0 1%"
    // },
    // span: {
    //   fontSize: '1.5rem',
    //   color: 'grey',
    //   padding: "2%",
    //   marginBottom: "1%"
    // }
}));


function InfoBar({ user }) {
    const classes = useStyles();
    const { loading, error, data, refetch, subscribeToMore } = useQuery(GET_CHAT_ROOMS, { variables: { email: user.email } });

    const [open, setOpen] = useState(false);
    const [searchRecipient, setSearchRecipient] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    
    const handleChange = e => {
      setSearchRecipient(e.target.value);
    };

    // refetches CHAT_ROOMS without refreshing page
    useEffect(() => {
        refetch();
    }, [refetch]);

    const _subscribeToNewChatRoom = subscribeToMore => {
      subscribeToMore({
        document: CHAT_ROOM_SUBSCRIPTION,
        updateQuery: (prev, {subscriptionData }) => {
          if (!subscriptionData.data) return prev
          const chatRoom = subscriptionData.data.chatRoom
          const exists = prev.profile.chatRooms.find(({ id }) => id === chatRoom.id);
          if (exists) return prev;

          return Object.assign({}, prev, {
            profile: {
              chatRooms: [chatRoom, ...prev.profile.chatRooms],
              __typename: prev.profile.__typename
            }
          })
        }
      })
    }

    if (loading) return <CircularProgress className={classes.loadingSpinner} />;
    if (error) return `Error! ${error.message}`;


    _subscribeToNewChatRoom(subscribeToMore)
    
    const newMessageClick = e => {
      e.preventDefault();
      console.log('New message clicked')
    };

    const newAnnouncementClick = e => {
      e.preventDefault();
      console.log('New announcement clicked')
    }

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    return (
      <div>
        {/* <div className={classes.icons}></div> */}
          <h1 className={classes.header}>Messages</h1>
          <CreateIcon className={classes.icons} onClick={handleOpen} /><span className={classes.span} onClick={handleOpen}>New Message</span>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <RecipientModal user={user}/>
           </Modal> 
          {user && user[config.roleUrl].includes("Admin") ? (
              <>
          <div>
              <LanguageIcon className={classes.icons} onClick={newAnnouncementClick}/><span className={classes.span} onClick={newAnnouncementClick}>New Announcement</span> 
            </div>
          </>
          ): null}
          <div>
          {data &&
          data?.profile.chatRooms?.map((chatRoom, id) => (
          <ChatRoom chatRoom={chatRoom} key={id} user={user}/>
          ))
          }
          </div>
          <Box component="div">
                    <TextField
                      variant="outlined"
                      type="text"
                      placeholder="Search Chats"
                      name="message"
                      value={searchRecipient}
                      onChange={handleChange}
                      />
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={<Icon>add_circle</Icon>}
                    >
                    Select
                </Button>
                </Box>
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