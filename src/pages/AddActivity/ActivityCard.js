import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-apollo';
import { Flex, Text } from 'adaptiv-ui';
import { UPDATE_ACTIVITY, DELETE_ACTIVITY } from './queries/ActivitiesQuery';

export default function ActivityCard(props) {
  const [editing, setEditing] = useState(false);
  const { handleSubmit, register } = useForm();
  const [UpdateActivity] = useMutation(UPDATE_ACTIVITY);
  const [DeleteActivity] = useMutation(DELETE_ACTIVITY);

  const onSubmit = async values => {
    await UpdateActivity({
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
    props.refetch();
    setEditing(!editing);
  };

  const removeActivity = async () => {
    await DeleteActivity({
      variables: {
        id: props.activity.id,
      },
    });
    props.refetch();
  };

  if (!editing) {
    return (
      <Flex stretch>
        <Flex jc_between stretch>
          <Text sf>Name: {props.activity.name}</Text>
          <Text sf>Date: {props.activity.startDate}</Text>
          <Text sf>Location: {props.activity.location}</Text>
          <Text sf>Time: {props.activity.startTime}</Text>
        </Flex>
        <Flex>
          <button
            onClick={() => {
              setEditing(!editing);
            }}
          >
            Edit
          </button>
          <button onClick={() => removeActivity()}>Delete</button>
        </Flex>
      </Flex>
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
