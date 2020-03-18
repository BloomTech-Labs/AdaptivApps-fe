import React, { useState } from 'react';
import { Link } from '@reach/router';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-apollo';
import { CREATE_EVENT } from './queries/EventsQuery';
import {
  Box,
  Form,
  Text,
  Flex,
  Input,
  useModal,
  Modal,
  Button,
  theme,
} from 'adaptiv-ui';

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
        title: values.title,
        startDate: values.startDate,
        endDate: values.endDate,
        location: values.location,
        imgUrl: values.imgUrl,
        details: values.details,
      },
    });
    await setCurrEvent(data.createEvent);
    toggle();
  };

  return (
    <Flex ai_start col stretch m="0 0 0 2rem">
      <Text xlf bold mm>
        Create an Event
      </Text>
      <Box h="0.2rem" w="90%" bg="lightgrey" />
      <Box h="2rem" />
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
            type="date"
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
            type="date"
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

        <Text mf>Image Url</Text>
        <Flex ai_center>
          <Input type="text" w="25rem" name="imgUrl" ref={register()} />
        </Flex>

        <Text mf>Details</Text>
        <Flex ai_center>
          <Input type="text" w="25rem" name="details" ref={register()} />
        </Flex>

        <Button
          jc_center
          secondary
          border={`2px solid ${theme.primary}`}
          w="9rem"
          h="4rem"
          type="submit"
        >
          Submit
        </Button>
      </Form>
      <Modal isActive={isActive}>
        <Link to={`/events/create/${currEvent.id}`}>
          Event Created. Add Activities.
        </Link>
      </Modal>
    </Flex>
  );
};

export default EventCreationForm;
