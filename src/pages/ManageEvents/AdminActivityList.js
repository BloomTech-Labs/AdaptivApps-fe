import React from 'react';
import MaterialTable from 'material-table';
import { Flex, Input } from 'adaptiv-ui';

const AdminActivityList = props => {
  const event_id = props.event_id;
  const activitiesData = props.activities.filter(
    activity => activity.event.id === event_id
  );

  return (
    <Flex col m="0 2% 0 2%">
      <MaterialTable
        title="List of Activities"
        columns={[
          { title: 'Name', field: 'name' },
          { title: 'Date', field: 'startDate' },
          { title: 'Time', field: 'startTime' },
          { title: 'Location', field: 'location' },
          { title: 'Type', field: 'type' },
          { title: 'Details', field: 'details' },
        ]}
        data={activitiesData}
        editable={{
          onRowAdd: async newData => {
            props.activitiesRefetch();
          },
          onRowUpdate: async (newData, oldData) => {
            props.activitiesRefetch();
          },
          onRowDelete: async oldData => {
            props.activitiesRefetch();
          },
        }}
        options={{
          search: false,
          showTitle: true,
          paging: false,
          emptyRowsWhenPaging: false,
          cellStyle: {
            fontSize: '1.2rem',
          },
          headerStyle: {
            fontSize: '1.2rem',
          },
        }}
      />
    </Flex>
  );
};

export default AdminActivityList;
