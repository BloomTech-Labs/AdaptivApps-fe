import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-apollo';
import { Form, Text, Flex, Input, Box } from 'adaptiv-ui';
import { CREATE_EVENT_WITH_ACTIVITIES } from './queries/EventsQuery';
import NoActivityCard from './NoActivityCard';
import EventCard from './EventCard';

// This is the form being used in to create an event
const ActivityCreationForm = props => {
  const [hasActivity, setHasActivity] = useState(false);
  const [activities, setActivities] = useState([]);
  const [currActivity, setCurrActivity] = useState({
    name: '',
    startDate: '',
    startTime: '',
    location: '',
    type: '',
    details: '',
  });
  const [CreateEvent] = useMutation(CREATE_EVENT_WITH_ACTIVITIES);
  const { handleSubmit, register } = useForm();

  const onSubmit = values => {
    setCurrActivity(values);
    setHasActivity(true);
  };

  useEffect(() => {
    setActivities([...activities, currActivity]);
    console.log('Right, so currActivity is', currActivity);
    console.log('And activites are', activities);
  }, [activities, currActivity, activities]);

  const event = props.event;
  const finishEventCreation = async () => {
    // const { data } = await CreateEvent({
    //   variables: {
    //     title: event.title,
    //     startDate: event.startDate,
    //     endDate: event.endDate,
    //     location: event.location,
    //     activities: activities,
    //   },
    // });
    // console.log('Returning data is', data);
    console.log('The event is', event);
    console.log('The activities are', activities);
  };

  return (
    <div>
      <button onClick={() => props.setShowEvent(true)}>Go Back</button>
      <Text xlf bold mm>
        Create an Event
      </Text>
      <Box h="0.2rem" w="90%" bg="lightgrey" />

      <Flex jc_between stretch>
        <Form ai_start col stretch onSubmit={handleSubmit(onSubmit)}>
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
          <button onClick={() => finishEventCreation()}>All Finished</button>
        </Form>

        <Flex col ai_start>
          <EventCard event={props.event} />
          {!hasActivity ? <NoActivityCard /> : <p>Please wait</p>}
        </Flex>
      </Flex>
    </div>
  );
};

export default ActivityCreationForm;
