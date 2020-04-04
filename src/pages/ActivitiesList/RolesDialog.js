import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';
import { IoIosAddCircle } from 'react-icons/io';
import { makeStyles, Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import { useAuth0 } from '../../config/react-auth0-spa';
import { useMutation } from 'react-apollo';
import { REGISTER_AS_ATHLETE } from './queries/AthleteRegister';
import { REGISTER_AS_COACH } from './queries/CoachRegister';
import { REGISTER_AS_VOLUNTEER } from './queries/VolunteerRegister';
import { REGISTER_AS_OTHER } from './queries/OtherRegister';

const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function SimpleDialog(props) {
  const classes = useStyles();
  const {
    onClose,
    selectedValue,
    open,
    clicked,
    athleteRegister,
    coachRegister,
    volunteerRegister,
    otherRegister,
  } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = value => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <div className="register">
        {clicked ? (
          <Box>
            <Button
              className="role"
              onClick={(() => console.log('clicked'), athleteRegister)}
            >
              {/* eslint-disable-next-line */}
              I'm Competing
            </Button>
            <Button
              className="role"
              onClick={(() => console.log('clicked'), coachRegister)}
            >
              {/* eslint-disable-next-line */}
              I'm Coaching
            </Button>
            <Button
              className="role"
              onClick={(() => console.log('clicked'), volunteerRegister)}
            >
              {/* eslint-disable-next-line */}
              I'm Volunteering
            </Button>
            <Button
              className="role"
              onClick={(() => console.log('clicked'), otherRegister)}
            >
              {/* eslint-disable-next-line */}
              I'm Spectating
            </Button>
          </Box>
        ) : null}
      </div>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo({ activity }) {
  const [clicked, setClicked] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [registerAsAthlete] = useMutation(REGISTER_AS_ATHLETE);
  const [registerAsCoach] = useMutation(REGISTER_AS_COACH);
  const [registerAsVolunteer] = useMutation(REGISTER_AS_VOLUNTEER);
  const [registerAsOther] = useMutation(REGISTER_AS_OTHER);

  const { user } = useAuth0();

  const athleteRegister = async () => {
    await registerAsAthlete({
      variables: { id: activity.id, email: user.email },
    });
    alert('Successfully registered to compete in this event!');
  };

  const coachRegister = async () => {
    await registerAsCoach({
      variables: { id: activity.id, email: user.email },
    });
    alert('Successfully registered as a Coach!');
  };

  const volunteerRegister = async () => {
    await registerAsVolunteer({
      variables: { id: activity.id, email: user.email },
    });
    alert('Successfully registered as a Volunteer');
  };

  const otherRegister = async () => {
    await registerAsOther({
      variables: { id: activity.id, email: user.email },
    });
    alert('Successfully registered as a Spectator');
  };

  const handleClickOpen = () => {
    setOpen(true);
    setClicked(!clicked);
  };

  const handleClose = value => {
    setOpen(false);
  };

  return (
    <div>
      <IconContext.Provider
        onBlur={handleClickOpen}
        value={
          clicked
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
        <Button onClick={handleClickOpen}>
          <IoIosAddCircle />
        </Button>
        <SimpleDialog
          athleteRegister={athleteRegister}
          coachRegister={coachRegister}
          volunteerRegister={volunteerRegister}
          otherRegister={otherRegister}
          clicked={clicked}
          open={open}
          onClose={handleClose}
        />
      </IconContext.Provider>
    </div>
  );
}
