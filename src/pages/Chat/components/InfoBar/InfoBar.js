import React, {useEffect} from "react";
import { styled } from '@material-ui/core/styles';
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
    fontSize: '5rem',
    color: 'grey'
  },
  span: {
    fontSize: '2rem',
    color: 'grey'
  },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

function InfoBar({ user }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const { loading, error, data, refetch } = useQuery(GET_CHAT_ROOMS, { variables: { email: user.email } });
    
    // refetches CHAT_ROOMS without refreshing page
    useEffect(() => {
        refetch();
    }, [refetch]);

    if (loading) return <CircularProgress className={classes.loadingSpinner} />;
    if (error) return `Error! ${error.message}`;
    
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
        <div className={classes.icons}></div>
          <h1 className={classes.header}>Messages</h1>
          <CreateIcon onClick={handleOpen} /><span className={classes.span}>New Message</span>
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
            <Fade in={open}>
              <div className={classes.paper}>
                <h2 id="transition-modal-title">Select a Recipient</h2>
                <p id="transition-modal-description">react-transition-group animates me.</p>
              </div>
            </Fade>
           </Modal> 
          {/* {user && user[config.roleUrl].includes("Admin") ? (
              <> */}
          <div className={classes.icons}>
              <LanguageIcon fontSize='5rem' onClick={newAnnouncementClick}/><span className={classes.span}>New Announcement</span> 
            </div>
          {/* </>
          ): null} */}
          <div>
          {data &&
          data?.profile.chatRooms?.map((chatRoom, id) => (
          <ChatRoom chatRoom={chatRoom} key={id} user={user}/>
          ))
          }
          </div>
      </div>
    )
}

export default InfoBar;