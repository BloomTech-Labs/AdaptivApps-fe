import React from 'react';
import { Flex } from 'adaptiv-ui';
import { useQuery } from 'react-apollo';
import { GET_PROFILES } from './queries';

// Ask stake holder before implementing this page
// From what I understand, this component can be a search console
// That performs a search-filter mechanism on users based on
// user specified conditions. For examples, find all users who are
// participating in a certain event and are under 18.  -- Jonathan C
const UsersFilter = () => {
  // Grabs all user profile information
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
