import React from 'react';

export default function EventCard({ event }) {
  return (
    <div>
      <p>
        {event.startDate} - {event.endDate}
      </p>
      <h6>{event.title}</h6>
      <p>{event.title}</p>
    </div>
  );
}
