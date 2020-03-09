import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Text, Flex, Input } from 'adaptiv-ui';

// This is the form being used in to create an event
const ActivityCreationForm = props => {
  const { handleSubmit, register } = useForm();

  // creates an activity
  const onSubmit = async (values, e) => {
    e.preventDefault();
    alert('Adding activity')
  };

  return (
    <div>
      <Form ai_start col stretch onSubmit={handleSubmit(onSubmit)}>
        <Text mf>Select a Day</Text>
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
}
};

export default EventCreationForm;
