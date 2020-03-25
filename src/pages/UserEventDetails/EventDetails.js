// React imports
import React from 'react'
// Component imports
import ActivityDetails from './ActivityDetails';
// Styling import 
import { Flex, Box } from 'adaptiv-ui';


export default function EventDetails(props) {
  
  const activeEvent = props.event[0];
  const currentActivities = activeEvent.activities;
  
  
  console.log('inside EventDetails', activeEvent);
  return (
    <Flex ai_start col stretch visible>
     <Flex m="3rem 0">
      <img
          style={{ height: '15rem', width: '40rem', objectFit: 'cover' }}
          src={activeEvent?.imgUrl}
        />
        <Box m="auto 0">
          <small style={{ margin: '1rem', color: "#808080", fontSize: "1.5rem" }}>
            {activeEvent?.startDate}-{activeEvent?.endDate}
          </small>
          <br />
          <p style={{ margin: '1rem', fontWeight: 'bold', fontSize: "2.1rem" }}>{activeEvent.title}</p>
          <p style={{ margin: '1rem', color: "#808080", fontSize: "1.5rem"}}>{activeEvent.location}</p>
        </Box>
     </Flex>
     <Flex>
       <p style={{ marginBottom: '2rem'}}>{activeEvent.details}</p>
     </Flex>
      <Flex visible col h="30rem" stretch>
        <p style={{fontWeight: "bold", fontSize: '1.8rem', marginBottom: "2rem"}}>My Activities</p>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Location</th>
              <th>Time</th>
              <th>My Role</th>
            </tr>
            {activeEvent.activities &&
              activeEvent.activities.map((activity, id) => (
                <ActivityDetails key={id} activity={activity} />
            ))}
          </tbody>
        </table>  
      </Flex>    
    </Flex>
  )
}
