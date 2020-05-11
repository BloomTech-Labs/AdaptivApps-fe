import React, { useState } from "react";
import { useMutation } from "react-apollo";
import { CREATE_ANNOUNCEMENT } from '../../queries/Announcements';

//Style imports
import {
  makeStyles,
  Button,
  Box,
  TextField
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  span: {
    fontSize: '2rem',
    color: '#2962FF',
    textAlign: 'center',
    fontWeight: 'normal',
    marginTop: '0%'
  },
  modal: {
    fontSize: "-webkit-xxx-large",
    width: '50%'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    borderRadius: '5px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  closeModal: {
    fontSize: "2rem",
    marginLeft: '100%',
    border: "none",
    '&:hover': {
      cursor: "pointer",
      color: "#2962FF"
    }, 
    '&:focus': {
      outline: "none"
    }
  },
  titles: {
    fontSize: '1.5rem',
    marginBottom: '0',
    fontWeight: 'normal'
  },
  titleDiv: {
    display: "flex",
    justifyContent: 'center'
  },
  titleInput: {
    width: '100%'
  },
  buttonDiv: {
    marginTop: '5%',
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    fontSize: '2rem',
    fontWeight: 'bold',
    background: '#2962FF',
    color: 'white',
    '&:hover': {
      color: '#2962FF'
    }
  }
}));
  
function AnnouncementModal({ setAnnouncementOpen, setAlertOpen }) {
  const classes = useStyles();

  const [createAnnouncement] = useMutation(CREATE_ANNOUNCEMENT);

  const [newAnnouncement, setNewAnnouncement] = useState();
  const [newAnnouncementText, setNewAnnouncementText] = useState();
  
  const handleTitleChange = e => {
    setNewAnnouncement(e.target.value);
  };

  const handleMessageChange = e => {
    setNewAnnouncementText(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    createAnnouncement({
      variables: {
        title: newAnnouncement,
        message: newAnnouncementText,
        isAnnouncementRoom: true
      }
    });

    setAnnouncementOpen(false);
    setAlertOpen(true);
  };

  const closeModal = e => {
    e.preventDefault();
    setAnnouncementOpen(false);
  };

  return (
    <div className={classes.modal}>          
      <div className={classes.paper}>
        <CloseIcon className={classes.closeModal} onClick={closeModal} />
        <h2 id="transition-modal-title" className={classes.span}>Create New Announcement</h2>
        <h3 className={classes.titles}>Announcement Title</h3>
        <div className={classes.titleDiv}>       
          <Box component="div" className={classes.titleInput}>
            <TextField
              variant="outlined"
              type="text"
              fullWidth
              name="announcementTitle"
              value={newAnnouncement}
              onChange={handleTitleChange} />
          </Box>
        </div>
        <h3 className={classes.titles}>Announcement Text</h3>
        <div className={classes.titleDiv}>
          <Box component="div" className={classes.titleInput}>
            <TextField
              variant="outlined"
              multiline={true}
              rows={2}
              rowsMax={4}
              fullWidth
              type="text"
              name="announcementText"
              value={newAnnouncementText}
              onChange={handleMessageChange} />
          </Box>
        </div>      
        <div className={classes.buttonDiv}>
          <Button variant="outlined" color="primary" onClick={onSubmit} className={classes.button}>
            Send Announcement
          </Button>
        </div>
      </div>
    </div>
  )
};
  
export default AnnouncementModal;