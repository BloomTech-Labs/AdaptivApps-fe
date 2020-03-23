import React, { useState } from 'react';
import { Box, Text, Flex } from 'adaptiv-ui';
import UsersList from './UsersList';
import UsersFilter from './UsersFilter';

const ManageUsers = () => {
  const [showList, setShowList] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  return (
    <Flex ai_start col stretch m="0 0 0 2rem">
      <Text xlf bold mm>
        Manage Registered Users
      </Text>
      <Box h="0.2rem" w="90%" bg="lightgrey" />
      <Box h="2rem" />

      {!showList ? (
        <button
          onClick={() => {
            setShowList(!showList);
          }}
        >
          See List of Users
        </button>
      ) : (
        <button
          onClick={() => {
            setShowList(!showList);
          }}
        >
          Hide
        </button>
      )}
      {showList ? <UsersList /> : null}

      {!showPanel ? (
        <button
          onClick={() => {
            setShowPanel(!showPanel);
          }}
        >
          Start Searching
        </button>
      ) : (
        <button
          onClick={() => {
            setShowPanel(!showPanel);
          }}
        >
          Hide
        </button>
      )}
      {showPanel ? <UsersFilter /> : null}
    </Flex>
  );
};

export default ManageUsers;
