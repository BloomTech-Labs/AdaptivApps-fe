import React from 'react';
import { Flex, Text } from 'adaptiv-ui';
import ActivityCard from './ActivityCard';

export default function ActivityList(props) {
  const activities = props.activities;
  const event = props.event;

  return (
    <Flex col m="0 0 0 1.5rem">
      <Flex></Flex>
      <Flex col m="0 0 2rem 0">
        <Text lf>{event.title}</Text>
        <Text mf color="#696969">
          {event.startDate} - {event.endDate}
        </Text>
        <Text mf color="#696969">
          {event.location}
        </Text>
      </Flex>

      <Flex col m="0 0 2rem 0">
        <Text lf>Added Activities</Text>
        <Text mf color="#696969">
          Here's a list of activities.
        </Text>
        <Text mf color="#696969">
          Use the form on the left to add more activities.
        </Text>
      </Flex>

      {activities &&
        activities.map(activity => (
          <ActivityCard
            activity={activity}
            key={activity.id}
            refetch={props.refetch}
          />
        ))}
    </Flex>
  );
}
