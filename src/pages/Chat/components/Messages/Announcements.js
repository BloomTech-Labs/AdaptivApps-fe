import React, { useEffect, useRef } from 'react';
import { useQuery } from "react-apollo";
import { GET_ANNOUNCEMENTS } from '../../queries/Announcements';

import {
  makeStyles
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

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
    padding: '1%'
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
  }
}));

export default function Announcements({ user }) {
  const classes = useStyles();

  const { loading, error, data } = useQuery(GET_ANNOUNCEMENTS, { variables: { isAnnouncementRoom: true } });

  const announcements = data && data?.announcements?.map((announcement, id) => {return {
      id: id,
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
                  <p className={classes.sender}>Title: {announcement.title}</p>
                </div>
                <p className={classes.messageText}>{announcement.message}</p>
                <div ref={announcementsEndRef} />
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  )
}