import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-apollo';
import { Flex, Text, Form, Input, Button, theme } from 'adaptiv-ui';
import { UPDATE_ACTIVITY, DELETE_ACTIVITY } from './queries/ActivitiesQuery';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

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
      <Flex stretch m="0 0 0.5rem 0">
        <Flex jc_between stretch>
          <Text mf m="0 2rem 0 0">
            Activity: {props.activity.name}
          </Text>
          <Text mf m="0 2rem 0 0">
            Date: {props.activity.startDate}
          </Text>
          <Text mf m="0 2rem 0 0">
            Location: {props.activity.location}
          </Text>
          <Text mf m="0 2rem 0 0">
            Starting Time: {props.activity.startTime}
          </Text>
          <Flex m="0 1rem 0 0">
            <FaEdit
              onClick={() => {
                setEditing(!editing);
              }}
            />
          </Flex>
          <Flex>
            <FaTrashAlt onClick={() => removeActivity()} />
          </Flex>
        </Flex>
      </Flex>
    );
  } else {
    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Flex>
          <Flex col>
            <Text mf>Select a Day</Text>
            <Input
              type="date"
              w="25rem"
              name="startDate"
              ref={register({
                required: 'Required',
              })}
            />
          </Flex>

          <Flex col>
            <Text mf>Activity Name</Text>
            <Input
              type="text"
              w="25rem"
              name="name"
              placeholder={props.activity.name}
              ref={register({
                required: 'Required',
              })}
            />
          </Flex>
        </Flex>

        <Flex>
          <Flex col>
            <Text mf>Location</Text>
            <Input
              type="text"
              w="25rem"
              name="location"
              placeholder={props.activity.location}
              ref={register({
                required: 'Required',
              })}
            />
          </Flex>

          <Flex col>
            <Text mf>Activity Times</Text>
            <Input
              type="time"
              w="25rem"
              name="startTime"
              ref={register({
                required: 'Required',
              })}
            />
          </Flex>
        </Flex>

        <Flex>
          <Flex col>
            <Text mf>Activity Type</Text>
            <Input
              type="text"
              w="25rem"
              name="type"
              placeholder={props.activity.type}
              ref={register()}
            />
          </Flex>

          <Flex col>
            <Text mf>Additional Details</Text>
            <Input
              type="text"
              w="25rem"
              name="details"
              placeholder={props.activity.details}
              ref={register()}
            />
          </Flex>
        </Flex>

        <Flex>
          <Button
            jc_center
            secondary
            border={`2px solid ${theme.primary}`}
            w="12rem"
            h="4rem"
            type="submit"
          >
            Submit
          </Button>
          <Button
            jc_center
            secondary
            border={`2px solid ${theme.primary}`}
            w="12rem"
            h="4rem"
            onClick={() => {
              setEditing(!editing);
            }}
          >
            Go Back
          </Button>
        </Flex>
      </Form>
    );
  }
}
