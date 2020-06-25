import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  img: {
    marginRight: "8px",
    marginLeft: "12px",
    width: "22px",
    height: "22px",
    borderRadius: "50%",

  },
}));

const CustomPeopleIcon = ({ chattingIcon, setEditChatRoom }) => {
  const classes = useStyles();

  return (
    <Tooltip title="Delete selected Chatroom">
      <div onClick={() => setEditChatRoom(true)}>
        <img src={chattingIcon} alt="icon for user" className={classes.img} />
      </div>
    </Tooltip>
  )
}

export default CustomPeopleIcon;