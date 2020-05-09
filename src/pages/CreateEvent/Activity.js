import React from 'react'

export default function Activity({ activity }) {
  return (
    <div>
      <h1>{activity.name}</h1>
      <h1>{activity.date}</h1>
      <h1>{activity.location}</h1>
      <h1>{activity.startTime} - {activity.endTime}</h1>
    </div>
  )
}
