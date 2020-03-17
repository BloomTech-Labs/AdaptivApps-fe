import React, {useState} from 'react';
import {ToolTip, NavLink, Text, Flex, Button, Modal, useModal} from "adaptiv-ui"
import { useMutation } from 'react-apollo';
import { REGISTER_AS_ATHLETE } from './queries/AthleteRegister';
import { REGISTER_AS_COACH } from './queries/CoachRegister';
import { useAuth0 } from '../../config/react-auth0-spa';
import { IconContext } from 'react-icons';
import { IoIosAddCircle } from "react-icons/io";
import PropTypes from 'prop-types';


export default function Activities({ activity }) {

  const [clicked, setClicked] = useState(false);
  const [color, setColor] = useState("black");

  function toggle() {
    setClicked(!clicked);
  }
  function hoverEnter(e){
    // setColor("blue");
    e.target.style.color = 'blue'
  }
  function hoverLeave(e){
    e.target.style.color = 'black'
  }

  const [registerAsAthlete] = useMutation(REGISTER_AS_ATHLETE)
  const [registerAsCoach] = useMutation(REGISTER_AS_COACH)

  const { user } = useAuth0();

  const athleteRegister = async () => {
    await registerAsAthlete({
      variables: {id: activity.id, email: user.email}
    })
    alert("Successfully registered to compete in this event!")
  }

  const coachRegister = async () => {
    await registerAsCoach({
      variables: {id:activity.id, email:user.email}
    })
    alert("Successfully registered as a Coach!")
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Location</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{activity.name}</td>
            <td>{activity.startDate}</td>
            <td>{activity.location}</td>
            <td>{activity.startTime}</td>
            <td>
              <ToolTip tt_left="50%" tabIndex={0} tt_w="14rem" border="none">
                  <IconContext.Provider value={ clicked ? {style: {background:'white', color: "#FFC629" , fontSize:"3rem"}} : {style: {background:'white', color: "#2962FF", fontSize:"3rem"}} }>
                  <Button bg={"white"} onClick={toggle} border="none">
                  <IoIosAddCircle/>
                  </Button>
                  </IconContext.Provider>
                  </ToolTip>

              
            </td>
            {clicked ? (
            <Flex col>
                  <Button bg="white" onFocus={hoverEnter} onBlur={hoverLeave} color={color} onMouseOver={hoverEnter} onMouseLeave={hoverLeave} onClick={(()=> console.log('clicked', athleteRegister, activity.id, user.email), athleteRegister)}>
                    I'm Competing
                    </Button>
                    <Button bg="white" onFocus={hoverEnter} onBlur={hoverLeave} color={color} onMouseOver={hoverEnter} onMouseLeave={hoverLeave} onClick={(()=> console.log('clicked'), coachRegister)}>
                    I'm Coaching
                    </Button>
                    <Text>
                    I'm Volunteering
                    </Text>
                    <Text>
                    I'm Spectating
                    </Text>
                    </Flex>
                    ) : null}
          </tr>

        </tbody>
        
      </table>
    </div>
  );
}
Activities.propTypes = {
  activity: PropTypes.object,
};