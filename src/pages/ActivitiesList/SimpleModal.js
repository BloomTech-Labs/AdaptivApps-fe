import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Container, Box, Button, Typography } from "@material-ui/core";
import eventImg from "../../assets/images/acs_hartford.png";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: "40rem",
    height: "56.8rem",
    backgroundColor: "white",
    padding: "0",
    "& .MuiButton-label": {
      fontSize: "1.6rem",
      fontWeight: "500",
    },
  },
  imgBox: {
    width: "100%",
  },
  btn: {
    alignItems: "start",
    padding: "0",
    textTransform: "none",
    color: "#2962FF",
    "& span": {
      alignItems: "start",
    },
  },
  img: {
    width: "100%",
    padding: "0",
    height: "16rem",
    objectFit: "cover",
  },
  modalMiddle: {
    padding: "2rem 0 2rem 2rem",
    marginBottom: "6rem",
  },
  date: {
    color: "#808080",
    fontSize: "1.4rem",
  },
  title: {
    fontSize: "2.1rem",
  },
  loc: {
    color: "#808080",
    fontSize: "1.6rem",
  },
  details: {
    marginTop: "2rem",
    overflowY: "scroll",
    overflowX: "hidden",
    height: "13rem",
    fontSize: "1.4rem",
    paddingRight: "1rem",
  },
  nameLink: {
    fontSize: "1.8rem",
    fontWeight: "500",
    textDecoration: "none",
    color: "#2962FF",
  },
  modalBottom: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  modalBtn2: {
    padding: "1rem 2.4rem",
    fontSize: "1.4rem",
    background: "#2962FF",
    color: "white",
    border: "1px solid #2962FF",
    borderRadius: "5px",
    textTransform: "none",
    boxSizing: "border-box",
    "&:hover": {
      background: "white",
      color: "#2962FF",
    },
  },
}));

export default function SimpleModal({ activity, activityData, activeEvent }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <Container style={modalStyle} className={classes.paper}>
      <Box className={classes.imgBox}>
        <img
          className={classes.img}
          src={
            ((activityData && activityData?.event?.imgUrl === null) ||
              activityData?.event?.imgUrlactivityData?.event?.imgUrl ===
              undefined ||
              activityData?.event?.imgUrl === ""
              ? eventImg
              : activityData?.event?.imgUrl) ||
            ((activeEvent && activeEvent?.event?.imgUrl === null) ||
              activeEvent?.event?.imgUrl === undefined ||
              activeEvent?.event?.imgUrl === ""
              ? eventImg
              : activeEvent?.imgUrl)
          }
          alt="Event"
        />
      </Box>
      <Box className={classes.modalMiddle}>
        <Typography className={classes.title} id="simple-modal-title">
          {activity?.name}
        </Typography>
        <Typography className={classes.date}>{activity?.startTime}</Typography>
        <Typography className={classes.details} id="simple-modal-description">
          {activity?.details}
        </Typography>
      </Box>
      <Box className={classes.modalBottom}>
        <Box>
          <Button className={classes.modalBtn2} onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Container>
  );

  return (
    <div>
      <Button className={classes.btn} onClick={handleOpen}>
        {activity?.name}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
