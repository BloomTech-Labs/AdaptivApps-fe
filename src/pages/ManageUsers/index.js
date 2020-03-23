import React from 'react';
import { Box, Text, Flex } from 'adaptiv-ui';

const ManageUsers = () => {
  return (
    <Flex ai_start col stretch m="0 0 0 2rem">
      <Text xlf bold mm>
        Manage Registered Users
      </Text>
      <Box h="0.2rem" w="90%" bg="lightgrey" />
      <Box h="2rem" />

      <p>Here is a list of users.</p>
    </Flex>
  );
};

export default ManageUsers;
