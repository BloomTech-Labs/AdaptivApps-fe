import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-apollo';
import { UPDATE_ACTIVITY, DELETE_ACTIVITY } from './queries/ActivitiesQuery';

export default function ActivityCard(props) {
  const [editing, setEditing] = useState(false);
  const { handleSubmit, register } = useForm();
  const [UpdateActivity] = useMutation(UPDATE_ACTIVITY);
  const [DeleteActivity] = useMutation(DELETE_ACTIVITY);

  const onSubmit = async values => {
    const { data } = await UpdateActivity({
      variables: {
        id: props.activity.id,
        name: values.name,
        startDate: values.startDate,
        startTime: values.startTime,
        location: values.location,
        type: values.type,
        details: values.details,
      },
    });
    await props.dispatch({
      type: 'UPDATE_ACTIVITY',
      payload: data.updateActivity,
    });
    setEditing(!editing);
  };

  const removeActivity = async () => {
    const { data } = await DeleteActivity({
      variables: {
        id: props.activity.id,
      },
    });
    await props.dispatch({
      type: 'DELETE_ACTIVITY',
      payload: data.deleteActivity,
    });
  };

  if (!editing) {
    return (
      <div>
        <p>Name: {props.activity.name}</p>
        <p>Date: {props.activity.startDate}</p>
        <p>Location: {props.activity.location}</p>
        <p>Time: {props.activity.startTime}</p>
        <p>Type: {props.activity.type}</p>
        <p>Details: {props.activity.details}</p>
        <button
          onClick={() => {
            setEditing(!editing);
          }}
        >
          Edit
        </button>
        <button onClick={() => removeActivity()}>Delete</button>
      </div>
    );
  } else {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Select a Day</label>
        <div>
          <input
            type="date"
            w="25rem"
            name="startDate"
            ref={register({
              required: 'Required',
            })}
          />
        </div>

        <label>Activity Name</label>
        <div>
          <input
            type="text"
            w="25rem"
            name="name"
            placeholder={props.activity.name}
            ref={register({
              required: 'Required',
            })}
          />
        </div>

        <label>Location</label>
        <div>
          <input
            type="text"
            w="25rem"
            name="location"
            placeholder={props.activity.location}
            ref={register({
              required: 'Required',
            })}
          />
        </div>

        <label>Activity Times</label>
        <div>
          <input
            type="time"
            w="25rem"
            name="startTime"
            ref={register({
              required: 'Required',
            })}
          />
        </div>

        <label>Activity Type</label>
        <div>
          <input
            type="text"
            w="25rem"
            name="type"
            placeholder={props.activity.type}
            ref={register()}
          />
        </div>

        <label>Additional Details</label>
        <div>
          <input
            type="text"
            w="25rem"
            name="details"
            placeholder={props.activity.details}
            ref={register()}
          />
        </div>

        <button type="submit">Edit</button>
        <button
          onClick={() => {
            setEditing(!editing);
          }}
        >
          Go Back
        </button>
      </form>
    );
  }
}
