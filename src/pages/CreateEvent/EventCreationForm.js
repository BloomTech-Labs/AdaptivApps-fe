import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-apollo';
import { CREATE_EVENT } from './queries';
import { Box, Form, Text, Flex, Input } from 'adaptiv-ui';

// This is the form being used in to create an event
const EventCreationForm = () => {
  const [showEvent, setShowEvent] = useState(true);
  const [currEvent, setCurrEvent] = useState({
    title: '',
    startDate: '',
    endDate: '',
    location: '',
  });

  const [CreateEvent] = useMutation(CREATE_EVENT);

  const { handleSubmit, register } = useForm();

  // creates an event
  const onSubmit = async (values, e) => {
    e.preventDefault();
    const { data } = await CreateEvent({
      variables: {
        title: values.title,
        startDate: values.startDate,
        endDate: values.endDate,
        location: values.location,
      },
    });
    await setShowEvent(false);
    await setCurrEvent(data.createEvent);
  };

  useEffect(() => {
    if (!showEvent) {
    }
  }, [currEvent, showEvent]);

  if (showEvent) {
    return (
      <div>
        <Text xlf bold mm>
          Create an Event
        </Text>
        <Box h="0.2rem" w="90%" bg="lightgrey" />
        <Form ai_start col stretch onSubmit={handleSubmit(onSubmit)}>
          <Text mf>Event Title</Text>
          <Flex ai_center>
            <Input
              type="text"
              w="25rem"
              name="title"
              ref={register({
                required: 'Required',
              })}
            />
          </Flex>

          <Text mf>Start Date</Text>
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

          <Text mf>End Date</Text>
          <Flex ai_center>
            <Input
              type="text"
              w="25rem"
              name="endDate"
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

          <button type="submit">Submit</button>
        </Form>
      </div>
    );
  } else {
    return <p>{currEvent.id}</p>;
  }
};

export default EventCreationForm;
