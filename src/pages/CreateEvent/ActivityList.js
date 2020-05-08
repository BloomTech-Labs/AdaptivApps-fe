import React from "react";
import Activity from "./Activity";

export default function ActivityList({ data }) {
  console.log("inside ActivityList", data);
  return (
    <div>
      <h1>{data?.event?.title}</h1>
      <h1>{data?.event?.date}</h1>
      <h1>{data?.event?.location}</h1>
      <h1>Added Activities</h1>
      {data?.event?.activities.length === 0 ? (
        <>
          <p>No activities added yet!</p>
          <p>
            Use the form on the left to add activities to any of the days for
            the event.
          </p>
        </>
      ) : (
        <>
          {data?.event?.activities.map((activity, id) => (
            <Activity key={id} activity={activity} />
          ))}
        </>
      )}
    </div>
  );
}
