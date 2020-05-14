import React from "react";
import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT } from "./queries";
import { useMutation } from "react-apollo";
import MaterialTable from "material-table";
import {
  makeStyles,
  Input,
  InputLabel,
  TablePagination,
  Select,
  MenuItem,
  Grid,
  Button,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import AdminActivityList from "./AdminActivityList";

// This component contains a list of events, passed in as props
const AdminEventList = props => {
  // Declare Create, Update, and Delete mutation functions
  const [CreateEvent] = useMutation(CREATE_EVENT);
  const [UpdateEvent] = useMutation(UPDATE_EVENT);
  const [DeleteEvent] = useMutation(DELETE_EVENT);

  // Grab the events data from props
  const events = props.events;
  //commented out to remove console warning, eventType defined but never used
  //const eventType = props.events.type;

  const useStyles = makeStyles({
    grid: {
      maxWidth: "120rem",
      marginLeft: "3rem",
      "& .MuiButton-label": {
        fontSize: "1.6rem",
        fontWeight: "500",
      },
    },
    tableHead: {
      "& th": {
        fontSize: "1.6rem",
      },
    },
    addBtn: {
      color: "#2763FF",
      textTransform: "none",
    },
    img: { width: "15rem", objectFit: "contain" },
    label: {
      marginTop: ".8rem",
      color: "red",
      fontSize: "1rem",
    },
  });
  const classes = useStyles();
  // This code is returning a material table object
  // For more info on material table, please visit their docs at
  // https://material-table.com/
  return (
    <Grid className={classes.grid}>
      <MaterialTable
        components={{
          Pagination: props => (
            <TablePagination
              {...props}
              SelectProps={{
                style: {
                  fontSize: "1.4rem",
                },
              }}
            />
          ),
        }}
        title=""
        columns={[
          {
            title: "Title",
            field: "title",
            render: rowData => (
              <div
                style={{
                  fontSize: "1.6rem",
                  width: "20rem",
                }}
              >
                {rowData.title}
              </div>
            ),
            editComponent: props => (
              <>
                <Input
                  type="text"
                  value={props.value}
                  onChange={e => props.onChange(e.target.value)}
                />
                <InputLabel className={classes.label}>*Required</InputLabel>
              </>
            ),
          },
          {
            title: "Type",
            field: "type",
            render: rowData => (
              <div
                style={{
                  fontSize: "1.6rem",
                  width: "10rem",
                }}
              >
                {rowData.type}
              </div>
            ),
            editComponent: props => (
              <>
                <Select
                  value={props.value}
                  onChange={e => props.onChange(e.target.value)}
                >
                  <MenuItem value="In Person">In Person</MenuItem>
                  <MenuItem value="Webinar">Webinar</MenuItem>
                </Select>
                <InputLabel className={classes.label}>*Required</InputLabel>
              </>
            ),
          },
          {
            title: "Host",
            field: "host",
            render: rowData => (
              <div
                style={{
                  fontSize: "1.6rem",
                  width: "16rem",
                }}
              >
                {rowData.host}
              </div>
            ),
            editComponent: props => (
              <Input
                type="text"
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
              />
            ),
          },
          {
            title: "Speakers",
            field: "speakers",
            render: rowData => (
              <div
                style={{
                  overflow: "scroll",
                  maxHeight: "10rem",
                  fontSize: "1.6rem",
                  width: "20rem",
                }}
              >
                {rowData.speakers}
              </div>
            ),
            editComponent: props => (
              <Input
                type="text"
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
              />
            ),
          },

          {
            title: "Start Time",
            field: "startTime",
            editComponent: props => (
              <Input
                type="time"
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
              />
            ),
          },
          {
            title: "Start Date",
            field: "startDate",
            render: rowData => (
              <div
                style={{
                  fontSize: "1.6rem",
                  width: "9rem",
                }}
              >
                {rowData.startDate}
              </div>
            ),
            editComponent: props => (
              <>
                <Input
                  type="date"
                  value={props.value}
                  onChange={e => props.onChange(e.target.value)}
                />
                <InputLabel className={classes.label}>*Required</InputLabel>
              </>
            ),
          },
          {
            title: "End Date",
            field: "endDate",
            render: rowData => (
              <div
                style={{
                  fontSize: "1.6rem",
                  width: "9rem",
                }}
              >
                {rowData.endDate}
              </div>
            ),
            editComponent: props => (
              <>
                <Input
                  type="date"
                  value={props.value}
                  onChange={e => props.onChange(e.target.value)}
                />
                <InputLabel className={classes.label}>*Required</InputLabel>
              </>
            ),
          },
          {
            title: "Location",
            field: "location",
            render: rowData => (
              <div
                style={{
                  fontSize: "1.6rem",
                  width: "14rem",
                }}
              >
                {rowData.location}
              </div>
            ),
            editComponent: props => (
              <>
                <Input
                  type="text"
                  value={props.value}
                  onChange={e => props.onChange(e.target.value)}
                />
                <InputLabel className={classes.label}>*Required</InputLabel>
              </>
            ),
          },
          {
            title: "Link",
            field: "link",
            render: rowData => (
              <div
                style={{
                  overflow: "scroll",
                  fontSize: "1.6rem",
                  width: "22rem",
                }}
              >
                {rowData.link}
              </div>
            ),
            editComponent: props => (
              <Input
                type="url"
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
              />
            ),
          },
          {
            title: "Image Url",
            field: "imgUrl",
            render: rowData => (
              <img
                style={{
                  maxHeight: "12rem",
                }}
                src={rowData.imgUrl}
                alt="Event"
                className={classes.img}
              />
            ),
            editComponent: props => (
              <Input
                type="text"
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
              />
            ),
          },
          {
            title: "Sponsors",
            field: "sponsors",
            render: rowData => (
              <div
                style={{
                  overflow: "scroll",
                  fontSize: "1.6rem",
                  width: "20rem",
                }}
              >
                {rowData.sponsors}
              </div>
            ),
            editComponent: props => (
              <Input
                type="text"
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
              />
            ),
          },
          {
            title: "Details",
            field: "details",
            render: rowData => (
              <div
                style={{
                  fontSize: "1.6rem",
                  width: "30rem",
                  maxHeight: "14rem",
                  overflow: "scroll",
                }}
              >
                {rowData.details}
              </div>
            ),
            editComponent: props => (
              <textarea
                style={{
                  fontSize: "1.6rem",
                }}
                rows="8"
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
                link: newData.link,
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
                link: newData.link,
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
              <AddCircleOutlineIcon
                style={{ color: "#2962FF" }}
                fontSize="large"
              />
              <Button className={classes.addBtn}>Add Event</Button>
            </>
          ),
          Edit: () => (
            <EditIcon style={{ color: "#2962FF" }} fontSize="large" />
          ),
          Delete: () => (
            <DeleteIcon style={{ color: "#2962FF" }} fontSize="large" />
          ),
        }}
        detailPanel={[
          {
            tooltip: "Show Activities",
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
            fontSize: "1.6rem",
          },
          headerStyle: {
            fontSize: "4rem",
            backgroundColor: "#2962FF",
            color: "#FFF",
          },
          rowStyle: {
            backgroundColor: "#FFF",
          },
          emptyRowsWhenPaging: false,
          toolbarButtonAlignment: "left",
          searchFieldStyle: {
            width: "20rem",
            fontSize: "1.6rem",
          },
          doubleHorizontalScrolldoubleHorizontalScroll: false,
          columnsButton: true,
        }}
      />
    </Grid>
  );
};

export default AdminEventList;
