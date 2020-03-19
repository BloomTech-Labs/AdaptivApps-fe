import React from 'react';
import MaterialTable from 'material-table';

const AdminActivityList = props => {
  const event_id = props.event_id;
  const activitiesData = props.activities.filter(
    activity => activity.event.id === event_id
  );

  return (
    <div>
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
        options={{
          search: false,
          showTitle: true,
          paging: false,
          emptyRowsWhenPaging: false,
        }}
        editable={{
          onRowAdd: async newData => {
            props.activitiesRefetch();
          },
        }}
      />
    </div>
  );
};

export default AdminActivityList;
