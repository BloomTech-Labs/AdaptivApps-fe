import React from 'react';

const AdminEventCard = props => {
  const event = props.event;
  return (
    <div>
      <h5>{event.title}</h5>
    </div>
  );
};

export default AdminEventCard;
