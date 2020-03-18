import React from 'react';
import { Flex } from 'adaptiv-ui';
import MaterialTable from 'material-table';
import AdminEventCard from './AdminEventCard';

const AdminEventList = props => {
  const events = props.events;
  const activities = props.activities;
  console.log(activities);
  return (
    <Flex col m="0 0 0 1.5rem" w="90%">
      <MaterialTable
        title=""
        columns={[
          { title: 'Title', field: 'title' },
          { title: 'Start Date', field: 'startDate' },
          { title: 'End Date', field: 'endDate' },
          { title: 'Location', field: 'location' },
          { title: 'Image Url', field: 'imgUrl' },
          { title: 'Details', field: 'details' },
        ]}
        data={events}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve();
              }, 1000);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve();
              }, 1000);
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve();
              }, 1000);
            }),
        }}
        detailPanel={rowData => {
          return <AdminEventCard event={rowData} />;
        }}
        options={{
          cellStyle: {
            fontSize: '1.4rem',
          },
          headerStyle: {
            fontSize: '1.4rem',
          },
        }}
      />
    </Flex>
  );
};

export default AdminEventList;
