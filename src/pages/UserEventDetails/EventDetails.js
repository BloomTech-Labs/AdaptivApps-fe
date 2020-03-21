// React imports
import React from 'react'
import Activities from '../ActivitiesList/Activities';


export default function EventDetails({ event }) {
  console.log(event.activities);
  return (
    <div>
      <h5>{event.title}</h5>
      {event.activities &&
        event?.activities?.map((activity, id) => (
          <Activities key={id} activity={activity} />
        ))}
      
    </div>
  )
}
