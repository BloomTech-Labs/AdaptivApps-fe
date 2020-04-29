import React, {useEffect, useState } from "react";
import { styled } from '@material-ui/core/styles';
import { useQuery } from "react-apollo";
import { GET_CHAT_ROOMS } from '../../queries/ChatRooms';
import ChatRoom from './ChatRoom'
import {
    makeStyles,
    useTheme,
    Box,
    Drawer,
    Hidden,
    IconButton,
    Toolbar,
    Button,
  } from "@material-ui/core";
  import MenuIcon from "@material-ui/icons/Menu";
  import CircularProgress from "@material-ui/core/CircularProgress";


// const MyButton = styled(Button)({
//     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//     border: 0,
//     borderRadius: 3,
//     boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//     color: 'white',
//     height: 48,
//     padding: '0 30px',
//   });

const useStyles = makeStyles(theme => ({
    root: {
      display: "flex",
      flexDirection: "column",
      border: "none",
    },
}));



function InfoBar({ user }) {
    const classes = useStyles();
    const { loading, error, data, refetch } = useQuery(GET_CHAT_ROOMS, { variables: { email: user.email } });
    const [newMessageToggle, setnewMessageToggle] = useState(false);
    // refetches CHAT_ROOMS without refreshing page
    useEffect(() => {
        refetch();
    }, [refetch]);

    if (loading) return <CircularProgress className={classes.loadingSpinner} />;
    if (error) return `Error! ${error.message}`;

    const handleClick = e => {
      e.preventDefault();
      console.log ('button submit')
      newMessageToggle ? setnewMessageToggle(false) : setnewMessageToggle(true)
  }

    return (
      <div>
          <h1>Messages</h1>
          <Button onClick={handleClick}>New Message</Button>
          
          {/* {user && user[config.roleUrl].includes("Admin") ? (
              <> */}
          <Button>New Annoucement</Button>
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