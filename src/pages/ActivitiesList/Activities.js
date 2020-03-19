import React, {useState} from 'react';
import {ToolTip, NavLink, Text, Flex, Button, Modal, useModal} from "adaptiv-ui"
import { useMutation } from 'react-apollo';
import { REGISTER_AS_ATHLETE } from './queries/AthleteRegister';
import { REGISTER_AS_COACH } from './queries/CoachRegister';
import { REGISTER_AS_VOLUNTEER } from './queries/VolunteerRegister';
import { REGISTER_AS_OTHER } from './queries/OtherRegister';
import { useAuth0 } from '../../config/react-auth0-spa';
import { IconContext } from 'react-icons';
import { IoIosAddCircle } from "react-icons/io";
import PropTypes from 'prop-types';


export default function Activities({ activity }) {

  const [clicked, setClicked] = useState(false);
  const [color] = useState("black");

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
  const [registerAsVolunteer] = useMutation(REGISTER_AS_VOLUNTEER)
  const [registerAsOther] = useMutation(REGISTER_AS_OTHER)

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

  const volunteerRegister = async () => {
    await registerAsVolunteer({
      variables: {id:activity.id, email:user.email}
    })
    alert("Successfully registered as a Volunteer")
  }

  const otherRegister = async () => {
    await registerAsOther({
      variables: {id: activity.id, email:user.email}
    })
    alert("Successfully registered as a Spectator")
  }

  return (
    <Flex row>
    <div >
      <table border="1px solid black">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Location</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody w="100%">
          <tr>
            <td>{activity.name}</td>
            <td>{activity.startDate}</td>
            <td>{activity.location}</td>
            <td>{activity.startTime}</td>
            <td>
              <ToolTip tt_left="50%" tabIndex={0} tt_w="14rem" border="none" position="absolute">
                  <IconContext.Provider value={ clicked ? {style: {background:'white', color: "#FFC629" , fontSize:"3rem"}} : {style: {background:'white', color: "#2962FF", fontSize:"3rem"}} }>
                  <Button bg={"white"} onClick={toggle} border="none">
                  <IoIosAddCircle/>
                  </Button>
                  </IconContext.Provider>
                  </ToolTip>

              
            </td>
            <td>
            <div border="1px solid black" >
              {clicked ? (
            <Flex col f_size="2rem">
                  <Button m=".2rem" p=".2rem" bg="cyan" xsf ta_left onFocus={hoverEnter} onBlur={hoverLeave} color={color} onMouseOver={hoverEnter} onMouseLeave={hoverLeave} onClick={(()=> console.log('clicked'), athleteRegister)}>
                    I'm Competing
                    </Button>
                    <Button  m=".2rem" p=".2rem" bg="cyan" xsf ta_left onFocus={hoverEnter} onBlur={hoverLeave} color={color} onMouseOver={hoverEnter} onMouseLeave={hoverLeave} onClick={(()=> console.log('clicked'), coachRegister)}>
                    I'm Coaching
                    </Button>
                    <Button m=".2rem" p=".2rem" bg="cyan" xsf ta_left onFocus={hoverEnter} onBlur={hoverLeave} color={color} onMouseOver={hoverEnter} onMouseLeave={hoverLeave} onClick={(()=> console.log('clicked'), volunteerRegister)}>
                    I'm Volunteering
                    </Button>
                    <Button m=".2rem" p=".2rem" bg="cyan" xsf ta_left onFocus={hoverEnter} onBlur={hoverLeave} color={color} onMouseOver={hoverEnter} onMouseLeave={hoverLeave} onClick={(()=> console.log('clicked'), otherRegister)}>
                    I'm Spectating
                    </Button>
                    </Flex>
                    ) : null}
               </div>
            </td>

          </tr>
          
       
          
        </tbody>
        
      </table>
    </div>
    </Flex>
  );
}
Activities.propTypes = {
  activity: PropTypes.object,
};