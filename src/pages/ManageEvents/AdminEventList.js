import React from 'react';
import { Flex, Button, theme } from 'adaptiv-ui';
import { Input, TablePagination, Select, MenuItem } from '@material-ui/core';
import EditIcon  from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useMutation } from 'react-apollo';
import MaterialTable from 'material-table';
import AdminActivityList from './AdminActivityList';
import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT } from './queries';

// This component contains a list of events, passed in as props
const AdminEventList = props => {
  // Declare Create, Update, and Delete mutation functions
  const [CreateEvent] = useMutation(CREATE_EVENT);
  const [UpdateEvent] = useMutation(UPDATE_EVENT);
  const [DeleteEvent] = useMutation(DELETE_EVENT);

  // Grab the events data from props
  const events = props.events;

  // This code is returning a material table object
  // For more info on material table, please visit their docs at
  // https://material-table.com/
  return (
    <Flex col w="90%">
      <MaterialTable
        components={{
          Pagination: props => (
            <TablePagination
              {...props}
              SelectProps={{
                style: {
                  fontSize: '1.4rem',
                },
              }}
            />
          ),
        }}
        title=""
        columns={[
          {
            title: 'Title',
            field: 'title',
            editComponent: props => (
              <Input
                type="text"
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
              />
            ),
          },
          {
            title: 'Type',
            field: 'type',
            editComponent: props => (
              <Select
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
              >
                <MenuItem value="Physical Event">Physical Event</MenuItem>
                <MenuItem value="Webinar">Webinar</MenuItem>
              </Select>
            ),
          },
          {
            title: 'Host',
            field: 'host',
            editComponent: props => (
              <Input
                type="text"
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
                m="0 0 0 -0.5rem"
              />
            ),
          },
          {
            title: 'Speakers',
            field: 'speakers',
            editComponent: props => (
              <Input
                type="text"
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
              />
            ),
          },

          {
            title: 'Start Time',
            field: 'startTime',
            editComponent: props => (
              <Input
                type="time"
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
                m="0 0 0 -0.5rem"
              />
            ),
          },
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
          {
            title: 'Location',
            field: 'location',
            editComponent: props => (
              <Input
                type="text"
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
                m="0 0 0 -0.5rem"
              />
            ),
          },
          {
            title: 'Zoom Link',
            field: 'zoomLink',
            editComponent: props => (
              <Input
                type="text"
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
              />
            ),
          },
          {
            title: 'Image Url',
            field: 'imgUrl',
            render: rowData => (
              <img
                style={{ height: 50, width: 50, borderRadius: '50%' }}
                src={rowData.imgUrl}
              />
            ),
            editComponent: props => (
              <Input
                type="text"
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
                m="0 0 0 -0.5rem"
              />
            ),
          },
          {
            title: 'Sponsors',
            field: 'sponsors',
            editComponent: props => (
              <Input
                type="text"
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
              />
            ),
          },
          {
            title: 'Details',
            field: 'details',
            render: rowData => (
              <div
                style={{
                  width: '30rem',
                  maxHeight: '14rem',
                  overflow: 'scroll',
                }}
              >
                {rowData.details}
              </div>
            ),
            editComponent: props => (
              <textarea
                rows="12"
                cols="60"
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
                type: newData.type,
                host: newData.host,
                speakers: newData.speakers,
                startTime: newData.startTime,
                startDate: newData.startDate,
                endDate: newData.endDate,
                location: newData.location,
                imgUrl: newData.imgUrl,
                sponsors: newData.sponsors,
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
                type: newData.type,
                host: newData.host,
                speakers: newData.speakers,
                startTime: newData.startTime,
                startDate: newData.startDate,
                endDate: newData.endDate,
                location: newData.location,
                imgUrl: newData.imgUrl,
                sponsors: newData.sponsors,
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
        icons={{
          Add: () => (
            <>
              <AddCircleOutlineIcon style={{ color:'#2962FF' }} fontSize='large'/>
                <Button primary style={{ padding: '0'}}>
                  Add Event
                </Button>
            </>
          ),
          Edit: () => (
            <EditIcon style={{ color:'#2962FF' }} fontSize='large' />
             
          ),
          Delete: () => (
            <DeleteIcon style={{ color:'#2962FF' }} fontSize='large' />
          )
        }}
        detailPanel={[
          {
            tooltip: 'Show Activities',
            isFreeAction: true,
            render: rowData => {
              // When clicking on a row, display a list of activities associated
              // With the event
              const event_id = rowData.id;
              return <AdminActivityList event_id={event_id} />;
            },
          },
        ]}
        options={{
          cellStyle: {
            width: '200rem',
            fontSize: '1.6rem',
          },
          headerStyle: {
            fontSize: '1.6rem',
            backgroundColor: '#2962FF',
            color: '#FFF',
          },
          rowStyle: {
            backgroundColor: '#FFF',
          },
          emptyRowsWhenPaging: false,
          toolbarButtonAlignment: 'left',
          searchFieldStyle: {
            width: '20rem',
            fontSize: '1.6rem',
          },
        }}
      />
    </Flex>
  );
};

export default AdminEventList;
