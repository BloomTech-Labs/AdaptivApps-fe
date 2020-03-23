import React from 'react';
import { Flex } from 'adaptiv-ui';
import { useQuery } from 'react-apollo';
import { GET_PROFILES } from './queries';

const UsersFilter = () => {
  const { data } = useQuery(GET_PROFILES);
  const profiles = data?.profiles;

  return (
    <Flex col m="0 2% 0 2%">
      <p>Construct a customized filter panel on this page</p>
      <p>For example, find all registered users</p>
      <p>who have signed up for an event and have a certain disability</p>
    </Flex>
  );
};

export default UsersFilter;
