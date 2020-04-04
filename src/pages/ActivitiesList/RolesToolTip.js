import React, { useState } from 'react';
import { Flex, ToolTip, Button } from 'adaptiv-ui';
import { IconContext } from 'react-icons';
import { IoIosAddCircle } from 'react-icons/io';
import { useMutation } from 'react-apollo';
import { REGISTER_AS_ATHLETE } from './queries/AthleteRegister';
import { REGISTER_AS_COACH } from './queries/CoachRegister';
import { REGISTER_AS_VOLUNTEER } from './queries/VolunteerRegister';
import { REGISTER_AS_OTHER } from './queries/OtherRegister';
import { useAuth0 } from '../../config/react-auth0-spa';
import PropTypes from 'prop-types';

function RolesToolTip({ activity }) {
  const [clicked, setClicked] = useState(false);
  const [onFocus, setOnFocused] = useState(false);
  const [color] = useState('black');
  const [registerAsAthlete] = useMutation(REGISTER_AS_ATHLETE);
  const [registerAsCoach] = useMutation(REGISTER_AS_COACH);
  const [registerAsVolunteer] = useMutation(REGISTER_AS_VOLUNTEER);
  const [registerAsOther] = useMutation(REGISTER_AS_OTHER);
  function toggle() {
    setClicked(!clicked);
  }
  function focus() {
    setOnFocused(!onFocus);
  }
  function hoverEnter(e) {
    // setColor("blue");
    e.target.style.color = 'blue';
  }
  function hoverLeave(e) {
    e.target.style.color = 'black';
  }

  return (
    <IconContext.Provider
      onBlur={toggle}
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
      <Button bg={'white'} onClick={toggle} position="absolute">
        <IoIosAddCircle />
      </Button>

      {/* <div className="tooltip"> */}
      <div className="register">
        {clicked ? (
          <Flex col f_size="1.2rem" visible w="20rem">
            <Button
              className="role"
              // onFocus={hoverEnter}
              onBlur={hoverLeave}
              color={color}
              onMouseOver={hoverEnter}
              onMouseLeave={hoverLeave}
              onClick={(() => console.log('clicked'), athleteRegister)}
            >
              {/* eslint-disable-next-line */}
              I'm Competing
            </Button>
            <Button
              className="role"
              onFocus={hoverEnter}
              onBlur={hoverLeave}
              color={color}
              onMouseOver={hoverEnter}
              onMouseLeave={hoverLeave}
              onClick={(() => console.log('clicked'), coachRegister)}
            >
              {/* eslint-disable-next-line */}
              I'm Coaching
            </Button>
            <Button
              className="role"
              onFocus={hoverEnter}
              onBlur={hoverLeave}
              color={color}
              onMouseOver={hoverEnter}
              onMouseLeave={hoverLeave}
              onClick={(() => console.log('clicked'), volunteerRegister)}
            >
              {/* eslint-disable-next-line */}
              I'm Volunteering
            </Button>
            <Button
              className="role"
              onFocus={hoverEnter}
              onBlur={(hoverLeave, toggle)}
              color={color}
              onMouseOver={hoverEnter}
              onMouseLeave={hoverLeave}
              onClick={(() => console.log('clicked'), otherRegister)}
            >
              {/* eslint-disable-next-line */}
              I'm Spectating
            </Button>
          </Flex>
        ) : null}
      </div>
    </IconContext.Provider>
  );
}

export default RolesToolTip;
RolesToolTip.propTypes = {
  activity: PropTypes.object,
};
