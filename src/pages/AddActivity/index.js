import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-apollo';
import { Form, Text, Flex, Input, Box } from 'adaptiv-ui';
import { CREATE_ACTIVITY, GET_ACTIVITIES } from './queries/ActivitiesQuery';
import ActivityList from './ActivityList';
import { useParams } from '@reach/router';

const ActivityCreationForm = () => {
  const { eventId } = useParams();

  // Manages activity creation using react hook form
  const [CreateActivity] = useMutation(CREATE_ACTIVITY);
  const { handleSubmit, register } = useForm();

  const { data: activitiesData, refetch } = useQuery(GET_ACTIVITIES, {
    variables: {
      id: eventId,
    },
  });

  console.log('Getting data', activitiesData?.event?.activities);

  const onSubmit = async values => {
    await CreateActivity({
      variables: {
        name: values.name,
        startDate: values.startDate,
        startTime: values.startTime,
        location: values.location,
        type: values.type,
        details: values.details,
        event_id: eventId,
      },
    });
    refetch();
  };

  return (
    <div>
      <Text xlf bold mm>
        Create an Activity
      </Text>
      <Box h="0.2rem" w="90%" bg="lightgrey" />

      <Flex jc_between stretch>
        <Form ai_start col onSubmit={handleSubmit(onSubmit)}>
          <Text mf>Select a Day</Text>
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
              type="time"
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

        {activitiesData ? (
          <ActivityList
            activities={activitiesData?.event?.activities}
            refetch={refetch}
          />
        ) : (
          <p>Loading</p>
        )}
      </Flex>
    </div>
  );
};

export default ActivityCreationForm;
