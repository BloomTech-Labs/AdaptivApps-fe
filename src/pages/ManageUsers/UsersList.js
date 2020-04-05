import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import { useQuery } from 'react-apollo';
import { GET_PROFILES } from './queries';
import MaterialTable from 'material-table';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
});

// A list of users. Can be customized using material table.
// Docs here https://material-table.com/
const UsersList = () => {
  const classes = useStyles();
  const { data } = useQuery(GET_PROFILES);
  console.log(data);

  return (
    <Container className={classes.root} m="0 2% 0 2%">
      <MaterialTable
        title="Registered Users"
        data={data?.profiles}
        columns={[
          { title: 'Firstname', field: 'firstName' },
          { title: 'Lastname', field: 'lastName' },
          { title: 'Birthday', field: 'birthday' },
          { title: 'Disability', field: 'disability' },
          { title: 'Legal Status', field: 'legal' },
        ]}
        options={{
          selection: true,
          search: true,
          showTitle: false,
          paging: true,
          emptyRowsWhenPaging: false,
          filtering: true,
          cellStyle: {
            fontSize: '1.2rem',
          },
          headerStyle: {
            fontSize: '1.2rem',
          },
        }}
        actions={[
          {
            tooltip: 'Send a message to all selected users',
            icon: 'message',
            onClick: (evt, data) =>
              alert('Send messages to ' + data.length + ' users?'),
          },
        ]}
      />
    </Container>
  );
};

export default UsersList;
