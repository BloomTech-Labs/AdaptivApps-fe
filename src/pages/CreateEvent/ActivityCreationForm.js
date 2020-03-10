import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Text, Flex, Input, Box } from 'adaptiv-ui';
import { useMutation } from 'react-apollo';
import { CREATE_ACTIVITY } from './queries/ActivitiesQuery';

// This is the form being used in to create an event
const ActivityCreationForm = props => {
  const [CreateActivity] = useMutation(CREATE_ACTIVITY);

  const { handleSubmit, register } = useForm();

  // creates an activity
  const onSubmit = async (values, e) => {
    e.preventDefault();
    console.log(values, props.event.id);
    const { data } = await CreateActivity({
      variables: {
        event_id: props.event.id,
        name: values.name,
        startDate: values.startDate,
        startTime: values.startTime,
        location: values.location,
        type: values.type,
        details: values.details,
      },
    });
    console.log('Returning data is', data);
  };

  return (
    <div>
      <button onClick={() => props.setShowEvent(true)}>Go Back</button>
      <Text xlf bold mm>
        Create an Event
      </Text>
      <Box h="0.2rem" w="90%" bg="lightgrey" />
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
        <button>All Finished</button>
      </Form>
    </div>
  );
};

export default ActivityCreationForm;
