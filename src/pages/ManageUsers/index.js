import React, { useState } from 'react';
import { Box, Text, Flex, Button } from 'adaptiv-ui';
import UsersList from './UsersList';
import UsersFilter from './UsersFilter';

// This page is still a work in progress
// It will display a list of users, using material table, and an admin
// Can select users to perform actions. For now that's a dummy function,
// But in future can be functions like group messaging.
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

      <Flex ai_start col m="0 0 0 1rem">
        {!showList ? (
          <Button
            onClick={() => {
              setShowList(!showList);
            }}
          >
            Show all users
          </Button>
        ) : (
          <Button
            onClick={() => {
              setShowList(!showList);
            }}
          >
            Hide users
          </Button>
        )}
        {showList ? <UsersList /> : null}

        {!showPanel ? (
          <Button
            onClick={() => {
              setShowPanel(!showPanel);
            }}
          >
            Start a customized search
          </Button>
        ) : (
          <Button
            onClick={() => {
              setShowPanel(!showPanel);
            }}
          >
            Hide search
          </Button>
        )}
        {showPanel ? <UsersFilter /> : null}
      </Flex>
    </Flex>
  );
};

export default ManageUsers;
