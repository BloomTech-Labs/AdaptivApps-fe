import React from 'react';
import { Flex, Input } from 'adaptiv-ui';
import { useMutation } from 'react-apollo';
import MaterialTable from 'material-table';
import AdminActivityList from './AdminActivityList';
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
          {
            title: 'Start Date',
            field: 'startDate',
            editComponent: props => (
              <Input
                type="date"
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
                m="0 0 0 -0.5rem"
              />
            ),
          },
          {
            title: 'End Date',
            field: 'endDate',
            editComponent: props => (
              <Input
                type="date"
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
                m="0 0 0 -0.5rem"
              />
            ),
          },
          { title: 'Location', field: 'location' },
          { title: 'Image Url', field: 'imgUrl' },
          {
            title: 'Details',
            field: 'details',
            editComponent: props => (
              <textarea
                type="text"
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
              />
            ),
          },
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
          const event_id = rowData.id;
          return (
            <AdminActivityList
              activities={activities}
              event_id={event_id}
              activitiesRefetch={props.activitiesRefetch}
            />
          );
        }}
        options={{
          cellStyle: {
            fontSize: '1.4rem',
          },
          headerStyle: {
            fontSize: '1.4rem',
            backgroundColor: '#01579b',
            color: '#FFF',
          },
          rowStyle: {
            backgroundColor: '#EEE',
          },
          emptyRowsWhenPaging: false,
        }}
      />
    </Flex>
  );
};

export default AdminEventList;
