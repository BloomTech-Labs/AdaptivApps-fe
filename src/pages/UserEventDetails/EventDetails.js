// React imports
import React from 'react'
// Component imports
import ActivityDetails from './ActivityDetails';
// Styling import 
import { Flex, Box } from 'adaptiv-ui';

export default function EventDetails({ event }) {
   
  return (
    <Flex ai_start col stretch visible>
     <Flex m="3rem 0">
      <img
          style={{ height: '16rem', width: '36rem', objectFit: 'cover' }}
          src={event.imgUrl}
        />
        <Box m="auto 0">
          <small style={{ margin: '1rem', color: "#808080", fontSize: "1.5rem" }}>
            {event.startDate}-{event.endDate}
          </small>
          <br />
          <p style={{ margin: '1rem', fontWeight: 'bold', fontSize: "2.1rem" }}>{event.title}</p>
          <p style={{ margin: '1rem', color: "#808080", fontSize: "1.5rem"}}>{event.location}</p>
        </Box>
     </Flex>
     <Flex>
       <p style={{ marginBottom: '2rem'}}>{event.details}</p>
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
            {event.activities &&
              event.activities.map((activity, id) => (
                <ActivityDetails key={id} activity={activity} />
            ))}
          </tbody>
        </table>  
      </Flex>    
    </Flex>
  )
}
