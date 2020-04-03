import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Container, Box, Button, Typography } from '@material-ui/core';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

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
    position: 'absolute',
    width: 400,
    height: 568,
    backgroundColor: 'white',
    padding: '0',
  },
  imgBox: {
    width: '100%',
  },
  btn: {
    padding: '0',
    fontSize: '1.6rem',
    fontWeight: '600',
    textTransform: 'none',
    color: '#2962FF',
  },
  img: {
    width: '100%',
    padding: '0',
    height: '20vh',
    objectFit: 'cover',
  },
  modalMiddle: {
    padding: '2rem 0 2rem 2rem',
    marginBottom: '2rem',
  },
  date: {
    color: '#808080',
    fontSize: '1.4rem',
  },
  title: {
    fontSize: '2.1rem',
  },
  loc: {
    color: '#808080',
    fontSize: '1.6rem',
  },
  details: {
    marginTop: '2rem',
    overflowY: 'scroll',
    overflowX: 'hidden',
    height: '14vh',
    fontSize: '1.4rem',
    paddingRight: '1rem',
  },
  modalBottom: {
    marginLeft: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'flex-end',
  },
  modalP: {
    margin: '1rem 0',
    fontSize: '2.1rem',
    color: '#2962FF',
  },
  modalBtn1: {
    padding: '1rem 2.5rem',
    margin: '0 1.5rem 0 0',
    fontSize: '1.4rem',
    color: '#2962FF',
    border: '1px solid #2962FF',
    borderRadius: '5px',
    textTransform: 'none',
    boxSizing: 'border-box',
    '&:hover': {
      background: '#2962FF',
      color: 'white',
    },
  },
  modalBtn2: {
    padding: '1rem 2.4rem',
    margin: '0 0 0 1.5rem',
    fontSize: '1.4rem',
    background: '#2962FF',
    color: 'white',
    border: '1px solid #2962FF',
    borderRadius: '5px',
    textTransform: 'none',
    boxSizing: 'border-box',
    '&:hover': {
      background: 'white',
      color: '#2962FF',
    },
  },
}));

export default function SimpleModal({ event, registerEvent }) {
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
        <img className={classes.img} src={event.imgUrl} />
      </Box>
      <Box className={classes.modalMiddle}>
        <Typography className={classes.date}>
          {event.startDate} - {event.endDate}
        </Typography>
        <Typography className={classes.title} id="simple-modal-title">
          {event.title}
        </Typography>
        <Typography className={classes.loc}>{event.location}</Typography>
        <Typography className={classes.details} id="simple-modal-description">
          {event.details}
        </Typography>
      </Box>
      <Box className={classes.modalBottom}>
        <p className={classes.modalP}>Add to "My Events?"</p>
        <Box>
          <Button className={classes.modalBtn1} onClick={registerEvent}>
            Add
          </Button>
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
        Add to my schedule
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
