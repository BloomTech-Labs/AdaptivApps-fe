import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation } from "react-apollo";
import { GET_ANNOUNCEMENTS, DELETE_ANNOUNCEMENT } from '../../queries/Announcements';
import EditAnnouncementModal from '../InfoBar/EditAnnouncementModal';

//Auth0 imports
import config from "../../../../config/auth_config";

import CircularProgress from "@material-ui/core/CircularProgress";
import Tooltip from '@material-ui/core/Tooltip';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import {
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    border: "none",
    maxWidth: '95%',
    marginLeft: '1%'
  },
  messageText: {
    marginTop: "0",
    padding: "0 2%",
    fontSize: '1.5rem'
  },
  messageHeader: {
    marginBottom: '2%',
    padding: '1%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  sender: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '0'
  },
  messageBox: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '1.5%',
    marginLeft: '3%',
    width: '97%'
  },
  messageSender: {
    backgroundColor: '#C4C4C480',
    padding: '1% 2%',
    fontSize: '1.5rem',
    width: '40%',
    borderRadius: '8px'
  },
  userMessage: {
    backgroundColor: '#2962ff51',
    padding: '1% 2%',
    fontSize: '1.5rem',
    width: '100%',
    borderRadius: '8px'
  },
  messageDiv: {
    maxHeight: '90vh',
    overflowY: 'auto',
    overflowX: 'hidden',
    margin: '0 8%'
  },
  header: {
    fontSize: '2rem',
    marginLeft: '4%'
  },
  iconDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '6%'
  },
  editIcon: {
    '&:hover': {
      cursor: 'pointer',
      color: '#2962FF'
    }
  },
  deleteIcon: {
    '&:hover': {
      cursor: 'pointer',
      color: 'red'
    }
  }
}));

export default function Announcements({ user, setUpdateChat, setDeleteChat }) {
  const classes = useStyles();

  const [announcementOpen, setAnnouncementOpen] = useState(false);
  const [announcementToEdit, setAnnouncementToEdit] = useState();

  const [deleteAnnouncement] = useMutation(DELETE_ANNOUNCEMENT);

  const { loading, error, data } = useQuery(GET_ANNOUNCEMENTS, { variables: { isAnnouncementRoom: true } });

  const announcements = data && data?.announcements?.map((announcement) => {return {
      id: announcement.id,
      title: announcement.title,
      message: announcement.message,
      createdAt: announcement.createdAt
    }
  });

  const announcementsEndRef = useRef(null)

  const scrollToBottom = () => {
    announcementsEndRef.current && announcementsEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom()
  }, [announcements]);

  const handleClose = () => {
    setAnnouncementOpen(false);
  };

  const deleteMessage = async (announcement) => {
    await deleteAnnouncement({
      variables: { id: announcement.id }
    });
    setDeleteChat(true);
  };

  if (loading) return <CircularProgress className={classes.loadingSpinner} />;
  if (error) return `Error! ${error.message}`;

  return (
    <div className={classes.root}>
      <div className={classes.messageDiv}>
        {announcements.map((announcement) => (
          <>
            <div key={announcement.id} className={classes.messageBox}>
              <div className={classes.userMessage}>
                <div className={classes.messageHeader}>
                  <p className={classes.sender}>{announcement.title}</p>
                  {user && user[config.roleUrl].includes("Admin") ? (
                  <div className={classes.iconDiv}>
                  <Tooltip title="Edit Announcement">
                    <EditOutlinedIcon className={classes.editIcon} onClick={() => {setAnnouncementOpen(true); setAnnouncementToEdit(announcement)}} />
                  </Tooltip>
                  <Tooltip title="Delete Announcement">
                    <DeleteIcon className={classes.deleteIcon} onClick={() => deleteMessage(announcement)} />
                  </Tooltip>
                  </div>) : null}
                </div>
                <p className={classes.messageText}>{announcement.message}</p>
                <div ref={announcementsEndRef} />
              </div>
            </div>
          </>
        ))}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={announcementOpen}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}>
          <EditAnnouncementModal setAnnouncementOpen={setAnnouncementOpen} announcement={announcementToEdit} setUpdateChat={setUpdateChat} />
        </Modal>
      </div>
    </div>
  )
}