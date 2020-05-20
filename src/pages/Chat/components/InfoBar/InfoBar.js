import React, { useState, useEffect } from "react";
import RecipientModal from '../Modals/Modal';
import ChatRoom from './ChatRoom';
import AnnouncementRoom from './AnnouncementRoom';
import AnnouncementModal from '../Modals/AnnouncementModal';

// Query / Mutation / Subscription Imports
import { useQuery } from "react-apollo";
import { GET_CHAT_ROOMS, CHAT_ROOM_SUBSCRIPTION } from '../../queries/ChatRooms';
import { GET_RECIPIENTS } from '../../queries/Chats';
import { GET_ANNOUNCEMENTS } from '../../queries/Announcements'

//Auth0 imports
import config from "../../../../config/auth_config";

// Style Imports
import CreateIcon from '@material-ui/icons/Create';
import LanguageIcon from '@material-ui/icons/Language';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from "@material-ui/core/CircularProgress";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';
import {
  makeStyles,
  Box,
  TextField
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: 'column',
    whiteSpace: "nowrap",
    overflow: 'hidden'
  },
  header: {
    fontSize: '2.5rem',
    fontWeight: "normal",
    color: '#2962FF',
    fontFamily: 'Arial',
    marginBottom: '10%',
    marginTop: "1%"
  },
  messageIcons: {
    maxWidth: '95%',
    display: 'flex',
    margin: '2.5% 0 5% 0',
    padding: '1%',
    alignItems: 'center',
    "&:hover": {
      background: 'lightgrey',
      borderRadius: '5px'
    }
  },
  icons: {
    fontSize: '2.75rem',
    color: 'grey',
    cursor: "pointer",
    marginRight: '10%'    
  },
  span: {
    fontSize: '1.5rem',
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
  },
  button: {
    marginTop: '3%'
  },
  chatroom: {
    margin: '2% 0'
  },
  divider: {
    marginTop:'5%'
  },
  box: {
    position: 'absolute',
    bottom: '0',
    margin: '1% 1% 1% -1%',
    width: '17.5%'
  },
  searchBox: {
    width: '90%',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  chatRoomDiv: {
    maxHeight: '80vh',
    overflowY: 'auto',
    overflowX: 'hidden',
    overflow: 'auto'
  }
}));

function InfoBar({ user, setAlertOpen, setNewRoom, setDeleteRoom }) {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [announcement, setAnnouncementOpen] = useState(false);
    const [searchRecipient, setSearchRecipient] = useState("");
    const [results, setResults] = useState([]);

    const { loading, error, data, refetch, subscribeToMore } = useQuery(GET_CHAT_ROOMS, { variables: { email: user.email } });
    const { data: recipients } = useQuery(GET_RECIPIENTS);
    const { data: announcements } = useQuery(GET_ANNOUNCEMENTS, { variables: { isAnnouncementRoom: true } });

    // Chat Room Subscription
    const _subscribeToNewChatRoom = subscribeToMore => {
      subscribeToMore({
        document: CHAT_ROOM_SUBSCRIPTION,
        updateQuery: (prev, {subscriptionData }) => {
          if (!subscriptionData.data) return prev
          const chatRoom = subscriptionData.data.chatRoom
          refetch();
          return Object.assign({}, prev, {
            profile: {
              chatRooms: [chatRoom, ...prev.profile.chatRooms],
              __typename: prev.profile.__typename
            }
          })
        }
      })
    };

    _subscribeToNewChatRoom(subscribeToMore);

    // Convert announcement object to Array & filter out notifications
    const announcementArray = announcements && Object.values(announcements)

    const notifications = announcementArray && announcementArray.map(ann => {
     return ann.filter(item => item.notification.length > 0 && item.notification)})
   
    // Make sure no participants pass through with a null or empty name
    const validParticipants = [];

    recipients && recipients.profiles.map(user => {
      if (user.firstName !== null && user.lastName !== null && 
          user.firstName !== '' && user.lastName !== '') {
            validParticipants.push(user);
      };
    });

    if (loading) return <CircularProgress className={classes.loadingSpinner} />;
    if (error) return `Error! ${error.message}`;

    // Load a user's chat rooms via participant names
    const participants = data && data?.profile.chatRooms.map(item => item !== null && item.participants).concat().flat();

    // Search for a chat room
    const searchRooms = e => {
      e.preventDefault();
      let filter = data && data?.profile.chatRooms.map(room => {
        let users = room.participants.map(user => {
          if (user.firstName !== null && user.lastName !== null &&
              user.firstName !== '' && user.lastName !== '') {
          return `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`;
        }});
        return users.filter(user => {
          if (user.includes(searchRecipient.toLowerCase())) {
            results.push(room);
            return results;
          } else if (searchRecipient === "all" || searchRecipient === "All") {
            return participants;
          };
        });
      });
      setSearchRecipient('');
    };

    const handleOpen = () => {
      setOpen(true);
    };
    
    const handleClose = () => {
      setOpen(false);
    };

    const handleChange = e => {
      setResults([]);
      setSearchRecipient(e.target.value);
    };

    const handleAnnouncementOpen = () => {
      setAnnouncementOpen(true);
    };

    const handleAnnouncementClose = () => {
      setAnnouncementOpen(false);
    };

    return (
      <div className={classes.root}>
        <h1 className={classes.header}>Messages</h1>
        <div className={classes.messageIcons}>
          <CreateIcon className={classes.icons} onClick={handleOpen} />
            <span className={classes.span} onClick={handleOpen} aria-label="New Message Button">New Message</span>
        </div>
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
          }}>
          <RecipientModal user={user} setOpen={setOpen} setNewRoom={setNewRoom} participants={participants} validParticipants={validParticipants} />
        </Modal> 
        {user && user[config.roleUrl].includes("Admin") ? 
        (
          <>
            <div className={classes.messageIcons}>
              <LanguageIcon className={classes.icons} /><span className={classes.span} onClick={handleAnnouncementOpen} aria-label="New Announcement Button">New Announcement</span> 
          </div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={announcement}
            onClose={handleAnnouncementClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}>
            <AnnouncementModal validParticipants={validParticipants} setAnnouncementOpen={setAnnouncementOpen} setAlertOpen={setAlertOpen} />
           </Modal>
          </>
        ) : null}
        <div className={classes.chatRoomDiv}>
          <AnnouncementRoom notifications={notifications} key='announcement_room' user={user} />
          <Divider variant="inset" className={classes.divider} />
          {results.length > 0 ? 
            (results.map((chatRoom, id) => (
              <div className={classes.chatroom} key={id}>
                <ChatRoom chatRoom={chatRoom} user={user} setDeleteRoom={setDeleteRoom}/>
                <Divider variant="inset" className={classes.divider} />
              </div>
            )))
            :
            (data.profile.chatRooms === undefined ? null : 
            (data && data?.profile.chatRooms?.map((chatRoom, id) => (
              <div className={classes.chatroom} key={id}>
                <ChatRoom chatRoom={chatRoom} user={user} setDeleteRoom={setDeleteRoom} />
                <Divider variant="inset" className={classes.divider} />
              </div>
            ))))
          }
        </div>
          <Tooltip title="Type 'all' or 'All' to clear search results">
            <Box component="div" className={classes.box}>
              <TextField
                className={classes.searchBox}
                variant="outlined"
                type="text"
                name="message"
                placeholder="Search Messages..."
                aria-label="Search Chatrooms"
                value={searchRecipient}
                onChange={handleChange}
                InputProps={{
                  endAdornment: 
                  <InputAdornment position="end">
                    <IconButton onClick={searchRooms} aria-label="Search Chatrooms">
                      <SearchIcon fontSize="large" />
                    </IconButton>
                  </InputAdornment>
                }} />
            </Box>
          </Tooltip>
      </div>
    )
};

export default InfoBar;