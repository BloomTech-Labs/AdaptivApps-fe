import React, { useState } from 'react';
import { useAuth0 } from '../../config/react-auth0-spa';

import { useMutation } from 'react-apollo';
import {
  REGISTER_AS_ATHLETE,
  REGISTER_AS_COACH,
  REGISTER_AS_VOLUNTEER,
  REGISTER_AS_SPECTATOR,
} from './queries/ActivityRegister';

import { makeStyles, Popover, Button, Box } from '@material-ui/core';
import { IconContext } from 'react-icons';
import { IoIosAddCircle } from 'react-icons/io';

import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2),
  },
  btn: {
    display: 'flex',
    height: '100%',
    background: 'transparent',
    boxShadow: 'none',
    border: 'none',
    margin: '0',
    padding: '0',
    '&:hover': {
      background: 'none',
      boxShadow: 'none',
    },
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
  },
  dialogPaper: {
    boxShadow: 'none',
  },
}));

export default function SimplePopover({ activity, activityData }) {
  const { user } = useAuth0();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [registerAsAthlete] = useMutation(REGISTER_AS_ATHLETE);
  const [registerAsCoach] = useMutation(REGISTER_AS_COACH);
  const [registerAsVolunteer] = useMutation(REGISTER_AS_VOLUNTEER);
  const [registerAsSpectator] = useMutation(REGISTER_AS_SPECTATOR);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const athleteRegister = async () => {
    await registerAsAthlete({
      variables: { id: activity.id, email: user.email },
    });
    alert('Successfully registered to compete in this event!');
    handleClose();
  };

  const coachRegister = async () => {
    await registerAsCoach({
      variables: { id: activity.id, email: user.email },
    });
    alert('Successfully registered as a Coach!');
    handleClose();
  };

  const volunteerRegister = async () => {
    await registerAsVolunteer({
      variables: { id: activity.id, email: user.email },
    });
    alert('Successfully registered as a Volunteer');
    handleClose();
  };

  const spectatorRegister = async () => {
    await registerAsSpectator({
      variables: { id: activity.id, email: user.email },
    });
    alert('Successfully registered as a Spectator');
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  console.log('activity in selectRole.js', activityData);
  return (
    <IconContext.Provider
      onBlur={handleClick}
      value={
        anchorEl
          ? {
              style: {
                background: 'white',
                color: '#FFC629',
                fontSize: '3rem',
              },
            }
          : {
              style: {
                background: 'white',
                color: '#2962FF',
                fontSize: '3rem',
              },
            }
      }
    >
      {activityData && activityData?.event?.type === 'Webinar' ? (
        <Button
          className={classes.btn}
          aria-describedby={id}
          variant="contained"
          onClick={spectatorRegister}
        >
          <IoIosAddCircle />
        </Button>
      ) : (
        <>
          <Button
            className={classes.btn}
            aria-describedby={id}
            variant="contained"
            onClick={handleClick}
          >
            <IoIosAddCircle />
          </Button>
          <Popover
            className={classes.popover}
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'left',
            }}
            classes={{ paper: classes.dialogPaper }}
          >
            <Box className={classes.box}>
              <Button className="role" onClick={athleteRegister}>
                I'm Competing
              </Button>
              <Button className="role" onClick={coachRegister}>
                I'm Coaching
              </Button>
              <Button className="role" onClick={volunteerRegister}>
                I'm Volunteering
              </Button>
              <Button className="role" onClick={spectatorRegister}>
                I'm Spectating
              </Button>
            </Box>
          </Popover>
        </>
      )}
    </IconContext.Provider>
  );
}

SimplePopover.propTypes = {
  activity: PropTypes.object,
};
