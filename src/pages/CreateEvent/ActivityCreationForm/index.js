import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-apollo';
import { Form, Text, Flex, Input, Box } from 'adaptiv-ui';
import { CREATE_ACTIVITY, GET_ACTIVITIES } from '../queries/ActivitiesQuery';
import NoActivityCard from './NoActivityCard';
import EventCard from './EventCard';
import ActivityList from './ActivityList';

// Set up reducer and context
// const initialState = { activities: [] };
// function reducer(state, action) {
//   switch (action.type) {
//     case 'ADD_ACTIVITY':
//       return { activities: [...state.activities, action.payload] };
//     default:
//       return { activities: [...state.activities]}
//   }
// }

const ActivityCreationForm = props => {
  // Manages activity creation using react hook form
  const [hasActivity, setHasActivity] = useState(false);
  const [CreateActivity] = useMutation(CREATE_ACTIVITY);
  const { handleSubmit, register } = useForm();

  const onSubmit = async values => {
    const { data } = await CreateActivity({
      variables: {
        name: values.name,
        startDate: values.startDate,
        startTime: values.startTime,
        location: values.location,
        type: values.type,
        details: values.details,
        event_id: props.event.id,
      },
    });
    console.log(data);
    setHasActivity(true);
  };

  const { data: activitiesData } = useQuery(GET_ACTIVITIES, {
    variables: {
      id: props.event.id,
    },
  });
  console.log('the associated activities are', activitiesData);

  return (
    <div>
      {/*<button onClick={() => props.setShowEvent(true)}>Go Back</button>*/}
      <Text xlf bold mm>
        Create an Event
      </Text>
      <Box h="0.2rem" w="90%" bg="lightgrey" />

      <Flex jc_between stretch>
        <Form ai_start col onSubmit={handleSubmit(onSubmit)}>
          <Text mf>Select a Day</Text>
          <Flex ai_center>
            <Input
              type="text"
              w="25rem"
              name="startDate"
              ref={register({
                required: 'Required',
              })}
            />
          </Flex>

          <Text mf>Activity Name</Text>
          <Flex ai_center>
            <Input
              type="text"
              w="25rem"
              name="name"
              ref={register({
                required: 'Required',
              })}
            />
          </Flex>

          <Text mf>Location</Text>
          <Flex ai_center>
            <Input
              type="text"
              w="25rem"
              name="location"
              ref={register({
                required: 'Required',
              })}
            />
          </Flex>

          <Text mf>Activity Times</Text>
          <Flex ai_center>
            <Input
              type="text"
              w="25rem"
              name="startTime"
              ref={register({
                required: 'Required',
              })}
            />
          </Flex>

          <Text mf>Activity Type</Text>
          <Flex ai_center>
            <Input type="text" w="25rem" name="type" ref={register()} />
          </Flex>

          <Text mf>Additional Details</Text>
          <Flex ai_center>
            <Input type="text" w="25rem" name="details" ref={register()} />
          </Flex>

          <button type="submit">Add Activity</button>
        </Form>

        <Flex col ai_start>
          <EventCard event={props.event} />
          {!hasActivity ? <NoActivityCard /> : <ActivityList />}
        </Flex>
      </Flex>
    </div>
  );
};

export default ActivityCreationForm;
