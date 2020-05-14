import React, { useState } from "react";
import { useMutation } from "react-apollo";
import { UPDATE_ANNOUNCEMENT } from '../../queries/Announcements';

//Style imports
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import {
  makeStyles,
  Button,
  Box,
  TextField
} from "@material-ui/core";

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
    width: '50%',
    marginLeft: '25%',
    marginTop: '5%'
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
  
function EditAnnouncementModal({ setAnnouncementOpen, announcement, setUpdateChat }) {
  const classes = useStyles();

  const [updateAnnouncement] = useMutation(UPDATE_ANNOUNCEMENT);

  const [updateTitle, setUpdateTitle] = useState(announcement.title);
  const [updateMessage, setUpdateMessage] = useState(announcement.message);
  
  const handleTitleChange = e => {
    setUpdateTitle(e.target.value);
  };

  const handleMessageChange = e => {
    setUpdateMessage(e.target.value);
  };

  // Send updated announcement to BE
  const onSubmit = async () => {
    await updateAnnouncement({
      variables: {
        id: announcement.id,
        title: updateTitle,
        message: updateMessage
      }
    });
    setAnnouncementOpen(false);
    setUpdateChat(true);
  };

  const closeModal = e => {
    e.preventDefault();
    setAnnouncementOpen(false);
  };

  return (
    <div className={classes.modal}>          
      <div className={classes.paper}>
        <Tooltip title="Cancel">
          <CloseIcon className={classes.closeModal} onClick={closeModal} />
        </Tooltip>
        <h2 id="transition-modal-title" className={classes.span}>Update Announcement</h2>
        <h3 className={classes.titles}>Announcement Title</h3>
        <div className={classes.titleDiv}>       
          <Box component="div" className={classes.titleInput}>
            <TextField
              variant="outlined"
              type="text"
              fullWidth
              name="announcementTitle"
              value={updateTitle}
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
              value={updateMessage}
              onChange={handleMessageChange} />
          </Box>
        </div>      
        <div className={classes.buttonDiv}>
          <Tooltip title="Update Announcement">
            <Button variant="outlined" color="primary" onClick={onSubmit} className={classes.button}>
              Update Announcement
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  )
};
  
export default EditAnnouncementModal;