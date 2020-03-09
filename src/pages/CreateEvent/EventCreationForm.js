import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Text, Flex, Input } from 'adaptiv-ui';

// This is the form being used in to create an event
const ProfileForm = () => {
  const [currEvent, setCurrEvent] = useState({
    title: '',
    startDate: '',
    endDate: '',
    location: '',
  });
  const { handleSubmit, register } = useForm();

  // updates profile in the backend and frontend
  const onSubmit = async (values, e) => {
    await setCurrEvent(values);
    alert('Submitted');
    console.log(currEvent);
  };

  return (
    <div>
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
};

export default ProfileForm;
