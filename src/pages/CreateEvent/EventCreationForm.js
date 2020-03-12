import React, { useState } from 'react';
import { Link } from '@reach/router';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-apollo';
import { CREATE_EVENT } from './queries/EventsQuery';
import { Box, Form, Text, Flex, Input, useModal, Modal } from 'adaptiv-ui';

// This is the form being used in to create an event
const EventCreationForm = () => {
  const [isActive, toggle] = useModal();

  const [currEvent, setCurrEvent] = useState({
    id: '',
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
        id: values.id,
        title: values.title,
        startDate: values.startDate,
        endDate: values.endDate,
        location: values.location,
      },
    });
    await setCurrEvent(data.createEvent);
    toggle();
  };

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
      <Modal isActive={isActive}>
        <Link to={`/events/create/${currEvent.id}`}>
          Event Created. Add Activities.
        </Link>
      </Modal>
    </div>
  );
};

export default EventCreationForm;
