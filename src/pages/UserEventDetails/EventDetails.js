// React imports
import React from 'react'
// Component imports
import ActivityDetails from './ActivityDetails';
// Styling import 
import { Flex, Box } from 'adaptiv-ui';

export default function EventDetails({ event }) {
   
  return (
    <Flex ai_start col stretch visible style={{margin: "2.2rem 1.2rem"}}>
     <Flex m="0rem 0.4rem 0rem 0.4rem">
      <img
          style={{ height: '16rem', width: '36rem', objectFit: 'cover' }}
          src={event.imgUrl}
        />
        <Flex col jc_center m="2.4rem" >
          <p style={{ margin: '0.4rem 0rem', color: "#808080", fontSize: "1.4rem" }}>
            {event.startDate} - {event.endDate}
          </p>
          <p style={{ margin: '0rem', fontWeight: 'bold', fontSize: "2.1rem" }}>{event.title}</p>
          <p style={{ margin: '0.4rem 0rem', color: "#808080", fontSize: "1.4rem"}}>{event.location}</p>
        </Flex>
     </Flex>
     <Flex>
       <p style={{ marginBottom: '2rem', marginTop: '1.6rem'}}>{event.details}</p>
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
              {/* <th>My Role</th> this feature coming soon */}
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
