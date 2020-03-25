import React from 'react';
import { Flex, Input } from 'adaptiv-ui';
import { useMutation } from 'react-apollo';
import MaterialTable from 'material-table';
import AdminActivityList from './AdminActivityList';
import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT } from './queries';
import { red } from '@material-ui/core/colors';

const AdminEventList = props => {
  const [CreateEvent] = useMutation(CREATE_EVENT);
  const [UpdateEvent] = useMutation(UPDATE_EVENT);
  const [DeleteEvent] = useMutation(DELETE_EVENT);

  const events = props.events;

  return (
    <Flex col m="0 0 0 1.5rem" w="90%">
      <MaterialTable
        title="Add An Event"
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
          {
            title: 'Image Url',
            field: 'imgUrl',
            render: rowData => (
              <img
                style={{ height: 50, width: 50, borderRadius: '50%' }}
                src={rowData.imgUrl}
              />
            ),
            cellStyle: rowData => ({}),
          },
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
        detailPanel={[
          {
            tooltip: 'Show Activities',
            isFreeAction: true,
            render: rowData => {
              const event_id = rowData.id;
              return <AdminActivityList event_id={event_id} />;
            },
          },
        ]}
        options={{
          cellStyle: {
            fontSize: '1.4rem',
          },
          headerStyle: {
            fontSize: '1.4rem',
            backgroundColor: '#2962FF',
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
