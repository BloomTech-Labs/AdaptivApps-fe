import React, { useState } from "react";

import AnnouncementRoom from "./AnnouncementRoom";
import AnnouncementModal from "../Modals/AnnouncementModal";

// Query / Mutation / Subscription Imports
import { useQuery, useSubscription } from "react-apollo";
import { GET_ANNOUNCEMENTS, ANNOUNCEMENT_SUBSCRIPTION } from '../../queries/Announcements';
import { GET_NOTIFICATIONS, NOTIFICATION_SUBSCRIPTION } from '../../queries/Notifications'

//Auth0 imports
import config from "../../../../config/auth_config";

// Style Imports
import LanguageIcon from "@material-ui/icons/Language";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  header: {
    fontSize: "2.5rem",
    fontWeight: "normal",
    color: "#2962FF",
    fontFamily: "Arial",
    marginBottom: "10%",
    marginTop: "1%",
  },
  messageIcons: {
    maxWidth: "95%",
    display: "flex",
    margin: "2.5% 0 5% 0",
    padding: "1%",
    alignItems: "center",
    "&:hover": {
      background: "lightgrey",
      borderRadius: "5px",
    },
  },
  icons: {
    fontSize: "2.75rem",
    color: "grey",
    cursor: "pointer",
    marginRight: "10%",
  },

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "-webkit-xxx-large",
  },
  chatRoomDiv: {
    maxHeight: "80vh",
    overflowY: "auto",
    overflowX: "hidden",
    overflow: "auto",
  },
}));

function InfoBar({ user, setAlertOpen }) {
  const classes = useStyles();
  const [announcement, setAnnouncementOpen] = useState(false);
  // Notification Subscription
  const { error: notificationError, loading: notificationLoading } = useSubscription(NOTIFICATION_SUBSCRIPTION)
  const { data: notifications, refetch: refetchNotifications } = useQuery(GET_NOTIFICATIONS, { variables: { email: user?.email } })
  // Announcement Subscription
  const { error: announcementError, loading: announcementLoading } = useSubscription(ANNOUNCEMENT_SUBSCRIPTION, { variables: { isAnnouncementRoom: true } });
  const { data: announcements, refetch: refetchAnnouncements } = useQuery(GET_ANNOUNCEMENTS, { variables: { isAnnouncementRoom: true } });

  const handleAnnouncementOpen = () => {
    setAnnouncementOpen(true);
  };

  const handleAnnouncementClose = () => {
    setAnnouncementOpen(false);
  };

  //if (loading) return <CircularProgress className={classes.loadingSpinner} />;
  if (announcementError || notificationError) return `Error! ${announcementError.message}` || `Error! ${notificationError.message}`;

  !announcementLoading && refetchAnnouncements();
  !notificationLoading && refetchNotifications();

  return (
    <div className={classes.root}>
      <h1 className={classes.header}>Announcements</h1>
      {user && user[config.roleUrl].includes("Admin") ? (
        <>
          <div className={classes.messageIcons}>
            <LanguageIcon className={classes.icons} />
            <span
              className={classes.span}
              onClick={handleAnnouncementOpen}
              aria-label="New Announcement Button"
            >
              New Announcement
            </span>
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
            }}
          >
            <AnnouncementModal
              user={user}
              setAnnouncementOpen={setAnnouncementOpen}
              setAlertOpen={setAlertOpen}
            />
          </Modal>
        </>
      ) : null}
      <div className={classes.chatRoomDiv}>
        <AnnouncementRoom
          user={user}
          announcements={announcements}
          notifications={notifications?.profile?.notifications}
        />
      </div>
    </div>
  );
}

export default InfoBar;
