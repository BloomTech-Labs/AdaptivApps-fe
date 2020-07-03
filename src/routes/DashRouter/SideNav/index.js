import React from "react";
import config from "../../../config/auth_config";

// Auth0 imports
import { useAuth0 } from "../../../config/react-auth0-spa";

// Query Imports
import { useQuery, useSubscription } from "react-apollo";
import { GET_MY_PROFILE, PROFILE_SUBSCRIPTION } from "./queries/profile";
import {
  GET_NOTIFICATIONS,
  NOTIFICATION_SUBSCRIPTION,
} from "../../../pages/Chat/queries/Notifications";
import {
  GET_ANNOUNCEMENTS,
  ANNOUNCEMENT_SUBSCRIPTION,
} from "../../../pages/Announcement/queries/Announcements";
import {
  GET_CHAT_ROOMS,
  CHAT_ROOM_SUBSCRIPTION,
} from "../../../pages/Chat/queries/ChatRooms";
import { CHAT_SUBSCRIPTION } from "../../../pages/Chat/queries/Chats";
import GroupIcon from "@material-ui/icons/GroupAddOutlined";

// Styling imports
import { withStyles } from "@material-ui/core/styles";

import NavLink from "./NavLink";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import BookmarkIcon from "@material-ui/icons/BookmarkBorder";
import BookmarksIcon from "@material-ui/icons/BookmarksOutlined";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import UserIcon from "@material-ui/icons/PersonOutlineOutlined";
import MenuIcon from "@material-ui/icons/Menu";
import ForumOutlinedIcon from "@material-ui/icons/ForumOutlined";
import SettingsIcon from "@material-ui/icons/SettingsOutlined";
import HouseOutlinedIcon from "@material-ui/icons/HouseOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { IconContext } from "react-icons";
import { FiLogOut } from "react-icons/fi";
import acsLogo from "../../../assets/images/acsLogo.png";
import Badge from "@material-ui/core/Badge";
import {
  makeStyles,
  useTheme,
  Box,
  Drawer,
  Hidden,
  IconButton,
  Toolbar,
  Tooltip,
  Button,
} from "@material-ui/core";

const drawerWidth = "25rem";

const StyledBadge = withStyles(theme => ({
  badge: {
    left: 0,
    top: 10,
    width: "2%",
    backgroundColor: "#052942",
    color: "white",
    fontSize: "1.25rem",
  },
}))(Badge);

const useStyles = makeStyles(theme => ({
  // Root is mobile only
  root: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("xs")]: {
      position: "absolute",
    },
  },
  sideContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    margin: "0",
    maxWidth: "100%",
    height: "100%",
  },
  anotherContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  navPaper: {
    border: "none",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    margin: "0",
    padding: "0",
    color: "#C69C5C",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  drawerPaper: {
    width: drawerWidth,
    border: "none",
    boxShadow:
      "0px 1px 3px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.12), 0px 0px 2px rgba(0, 0, 0, 0.14)",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  imgBoxAndNavItems: {
    marginTop: "4rem",
    display: "flex",
    flexDirection: "column",
  },
  imgBox: {
    width: "25rem",
    "& img": {
      width: "25rem",
    },
  },
  navContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: "0 auto",
    width: "100%",
  },
  navLink: {
    textDecoration: "none",
    height: "5rem",
    display: "flex",
    alignContent: "flex-start",
    alignItems: "center",
    margin: ".5rem auto",
    textAlign: "left",
    "& p": {
      fontSize: "1.6rem",
    },
  },
  disabledNavLink: {
    textDecoration: "none",
    height: "5rem",
    display: "flex",
    alignContent: "flex-start",
    alignItems: "center",
    margin: ".5rem 0",
    textAlign: "left",
    "& p": {
      fontSize: "1.6rem",
    },
    "&:hover": {
      cursor: "pointer",
    },
  },
  logoutContainer: {
    width: "100%",
    "& p": {
      fontSize: "1.6rem",
    },
  },
  logoutBtn: {
    display: "flex",
    justifyContent: "flex-start",
    margin: "0",
    textTransform: "none",
    width: "100%",
  },
  logoutIcon: {
    color: "#2962FF",
    margin: "0 1rem 0 3rem",
    fontSize: "2.5rem",
  },
  navIcon: {
    margin: "0 1rem 0 3rem",
    fontSize: "2.5rem",
  },
  iconActive: {
    color: "#FFFFFF",
  },
  logoutP: {
    color: "#2962FF",
  },
  underAge: {
    display: "none",
  },
}));

function SideNav(props) {
  const { user } = props;
  const { logout } = useAuth0();
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Refetch profile when updated
  const { data, refetch } = useQuery(GET_MY_PROFILE, {
    variables: {
      email: user?.email,
    },
  });
  //console.log(data && data.profile.legal);

  const { data: subData } = useSubscription(PROFILE_SUBSCRIPTION);

  // Update notifications in real time
  const {
    data: notifications,
    refetch: refetchNotifications,
  } = useQuery(GET_NOTIFICATIONS, { variables: { email: user?.email } });
  const {
    error: notificationError,
    loading: notificationLoading,
  } = useSubscription(NOTIFICATION_SUBSCRIPTION);

  // Chatroom/Chat messages/ Announcements Subscription
  const {
    error: roomError,
    loading: roomsLoading,
    data: chatRoomSub,
  } = useSubscription(CHAT_ROOM_SUBSCRIPTION);
  const {
    error: chatError,
    loading: chatLoading,
    data: chatsData,
  } = useSubscription(CHAT_SUBSCRIPTION);
  const {
    error: announcementError,
    loading: announcementLoading,
  } = useSubscription(ANNOUNCEMENT_SUBSCRIPTION, {
    variables: { isAnnouncementRoom: true },
  });
  const {
    error,
    loading,
    data: chatRoomData,
    refetch: refetchData,
  } = useQuery(GET_CHAT_ROOMS, { variables: { email: user?.email } });
  const {
    data: announcements,
    refetch: refetchAnnouncements,
  } = useQuery(GET_ANNOUNCEMENTS, { variables: { isAnnouncementRoom: true } });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const announcementNotifications = [];
  const roomNotifications = [];
  const setAnnouncementNotifications = notifications?.profile?.notifications?.map(
    notification =>
      notification.label === "Announcement" &&
      announcementNotifications.push(notification)
  );
  const setRoomNotifications = notifications?.profile?.notifications?.map(
    notification =>
      notification.chatroom !== null &&
      notification.label !== "Announcement" &&
      roomNotifications.push(notification)
  );

  const drawer = (
    <div className={classes.sideContainer}>
      <div className={classes.anotherContainer}>
        <div className={classes.imgBoxAndNavItems}>
          <Box className={classes.imgBox}>
            <img src={acsLogo} alt="ACS Logo" />
          </Box>
          <Box className={classes.navContainer}>
            <NavLink to="/" className={classes.navLink}>
              <HouseOutlinedIcon className={classes.navIcon} />
              <p>Welcome</p>
            </NavLink>
            <NavLink to="announcements" className={classes.navLink}>
              <StyledBadge
                overlap="circle"
                badgeContent={announcementNotifications?.length}
              >
                <BookmarksIcon className={classes.navIcon} />
              </StyledBadge>
              <p>Announcements</p>
            </NavLink>
            <NavLink to="calendar" className={classes.navLink}>
              <CalendarTodayIcon className={classes.navIcon} />
              <p>Events Calendar</p>
            </NavLink>
            <NavLink
              to={`user/${data?.profile?.userName}`}
              className={classes.navLink}
            >
              <UserIcon className={classes.navIcon} />
              <p>My Profile</p>
            </NavLink>
            <NavLink to="myevents" className={classes.navLink}>
              <BookmarkIcon className={classes.navIcon} />
              <p>My Events</p>
            </NavLink>
            {/* Profile Validation */}
            {data?.profile?.userName === null ? (
              <Tooltip title="Please complete your profile information to access Chat">
                <div className={classes.disabledNavLink}>
                  <ForumOutlinedIcon className={classes.navIcon} />
                  <p>Chat</p>
                </div>
              </Tooltip>
            ) : data?.profile?.legal === "No" ? (
              <Tooltip title="Chat feature is not available to users under 18 years old">
                <div className={classes.underAge}>
                  <ForumOutlinedIcon className={classes.navIcon} />
                  <p>Chat</p>
                </div>
              </Tooltip>
            ) : (
              <NavLink to="/chats" className={classes.navLink}>
                <StyledBadge
                  overlap="circle"
                  badgeContent={roomNotifications?.length}
                >
                  <ForumOutlinedIcon className={classes.navIcon} />
                </StyledBadge>
                <p>Chat</p>
              </NavLink>
            )}
            <NavLink to="/newsfeed" className={classes.navLink}>
              <HomeIcon className={classes.navIcon} />
              <p>Newsfeed</p>
            </NavLink>
            <NavLink to="settings" className={classes.navLink}>
              <SettingsIcon className={classes.navIcon} />
              <p>Settings</p>
            </NavLink>
            <NavLink to="faqs" className={classes.navLink}>
              <InfoOutlinedIcon className={classes.navIcon} />
              <p>FAQ</p>
            </NavLink>
            {user && user[config.roleUrl].includes("Admin") ? (
              <>
                <NavLink to="createEvent" className={classes.navLink}>
                  <HomeIcon className={classes.navIcon} />
                  <p>Manage Events</p>
                </NavLink>
                <NavLink to="manageUsers" className={classes.navLink}>
                  <GroupIcon className={classes.navIcon} />
                  <p>Manage Users</p>
                </NavLink>
              </>
            ) : null}
          </Box>
        </div>
        <Box className={classes.logoutContainer}>
          <Button className={classes.logoutBtn} onClick={() => logout()}>
            <IconContext.Provider
              value={{ style: { transform: "rotate(180deg)" } }}
            >
              <FiLogOut className={classes.logoutIcon} />
              <p className={classes.logoutP}>Log Out</p>
            </IconContext.Provider>
          </Button>
        </Box>
      </div>
    </div>
  );

  !subData && refetch();
  !roomsLoading && refetchData();
  !chatLoading && refetchData();
  !announcementLoading && refetchAnnouncements();
  !notificationLoading && refetchNotifications();

  return (
    <div className={classes.root}>
      <Toolbar position="fixed" style={{ margin: "0" }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
          style={{ margin: "0" }}
        >
          <MenuIcon className={classes.navIcon} style={{ margin: "0" }} />
        </IconButton>
      </Toolbar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

export default SideNav;
