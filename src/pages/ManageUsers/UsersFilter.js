import React from 'react';
import { Flex } from 'adaptiv-ui';
import { useQuery } from 'react-apollo';
import { GET_PROFILES } from './queries';

const UsersFilter = () => {
  const { data } = useQuery(GET_PROFILES);
  const profiles = data?.profiles;

  return (
    <Flex col m="0 2% 0 2%">
      <p>Nothing for now</p>
    </Flex>
  );
};

export default UsersFilter;
