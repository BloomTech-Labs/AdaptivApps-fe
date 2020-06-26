import React from 'react';
import { useNavigate } from "@reach/router";
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  img: {
    marginRight: "8px",
    marginLeft: "12px",
    width: "28px",
    height: "28px",
    borderRadius: "50%",
  },
}));

const CustomMessageIcon = ({ myProfileUsername, otherProfileUsername, pictureIcon }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const link = myProfileUsername ? myProfileUsername : otherProfileUsername;
  return (
    <Tooltip title="Visit profile page">
      <div onClick={() => navigate(`/user/${link}`)}>
        <img src={pictureIcon} alt="icon for user" className={classes.img} />
      </div>
    </Tooltip>
  )
}

export default CustomMessageIcon;