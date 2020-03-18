import React from 'react';
import { Flex } from 'adaptiv-ui';
import { useMutation } from 'react-apollo';
import MaterialTable from 'material-table';
import AdminEventCard from './AdminEventCard';
import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT } from './queries';

const AdminEventList = props => {
  const events = props.events;
  const activities = props.activities;

  const [CreateEvent] = useMutation(CREATE_EVENT);
  const [UpdateEvent] = useMutation(UPDATE_EVENT);
  const [DeleteEvent] = useMutation(DELETE_EVENT);

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
          onRowAdd: async newData => {
            await CreateEvent({
              variables: {
                title: newData.title,
                startDate: newData.startDate,
                endDate: newData.endDate,
                location: newData.location,
                imgUrl: newData.imgUrl,
                details: newData.details,
              },
            });
            props.eventsRefetch();
          },
          onRowUpdate: async (newData, oldData) => {
            await UpdateEvent({
              variables: {
                id: newData.id,
                title: newData.title,
                startDate: newData.startDate,
                endDate: newData.endDate,
                location: newData.location,
                imgUrl: newData.imgUrl,
                details: newData.details,
              },
            });
            props.eventsRefetch();
          },
          onRowDelete: async oldData => {
            await DeleteEvent({
              variables: {
                id: oldData.id,
              },
            });
            props.eventsRefetch();
          },
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
