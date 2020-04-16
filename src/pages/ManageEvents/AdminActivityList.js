import React from "react";
import { makeStyles, Input, Button, Grid } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { useQuery, useMutation } from "react-apollo";
import {
  CREATE_ACTIVITY,
  UPDATE_ACTIVITY,
  DELETE_ACTIVITY,
  GET_ONE_EVENT,
} from "./queries";
import MaterialTable from "material-table";

const useStyles = makeStyles({
  addBtn: {
    color: "#2763FF",
    textTransform: "none",
  },
});
// Material table docs here: https://material-table.com/
const AdminActivityList = props => {
  const classes = useStyles();
  // Grab the event id from props
  const event_id = props.event_id;
  // Call backend to fetch the one event associated with event id
  const { data, refetch } = useQuery(GET_ONE_EVENT, {
    variables: {
      id: event_id,
    },
  });

  // Declares C, U, and D for activities
  const [CreateActivity] = useMutation(CREATE_ACTIVITY);
  const [UpdateActivity] = useMutation(UPDATE_ACTIVITY);
  const [DeleteActivity] = useMutation(DELETE_ACTIVITY);

  // Similar to its parent component, activities list will be displayed
  // Using material table.
  return (
    <Grid>
      <MaterialTable
        title=""
        columns={[
          {
            title: "Name",
            field: "name",
            editComponent: props => (
              <Input
                type="text"
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
              />
            ),
          },
          {
            title: "Date",
            field: "startDate",
            editComponent: props => (
              <Input
                type="date"
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
              />
            ),
          },
          {
            title: "Time",
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
            title: "Location",
            field: "location",
            editComponent: props => (
              <Input
                type="text"
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
              />
            ),
          },
          {
            title: "Link",
            field: "link",
            editComponent: props => (
              <Input
                type="text"
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
              />
            ),
          },
          {
            title: "Type",
            field: "type",
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
                rows="12"
                cols="60"
                type="text"
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
              />
            ),
          },
        ]}
        data={data?.event?.activities}
        editable={{
          onRowAdd: async newData => {
            await CreateActivity({
              variables: {
                name: newData.name,
                startDate: newData.startDate,
                startTime: newData.startTime,
                location: newData.location,
                link: newData.link,
                type: newData.type,
                details: newData.details,
                event_id: event_id,
              },
            });
            refetch();
          },
          onRowUpdate: async (newData, oldData) => {
            await UpdateActivity({
              variables: {
                id: oldData.id,
                name: newData.name,
                startDate: newData.startDate,
                startTime: newData.startTime,
                location: newData.location,
                link: newData.link,
                type: newData.type,
                details: newData.details,
              },
            });
            refetch();
          },
          onRowDelete: async oldData => {
            await DeleteActivity({
              variables: {
                id: oldData.id,
              },
            });
            refetch();
          },
        }}
        icons={{
          Add: () => (
            <>
              <AddCircleOutlineIcon
                style={{ color: "#2962FF" }}
                fontSize="large"
              />
              <Button className={classes.addBtn}>Add Activity</Button>
            </>
          ),
          Edit: () => (
            <EditIcon style={{ color: "#2962FF" }} fontSize="large" />
          ),
          Delete: () => (
            <DeleteIcon style={{ color: "#2962FF" }} fontSize="large" />
          ),
        }}
        options={{
          cellStyle: {
            fontSize: "1.4rem",
          },
          headerStyle: {
            fontSize: "1.4rem",
            backgroundColor: "#2962FF",
            color: "#FFF",
          },
          search: false,
          showTitle: true,
          paging: false,
          emptyRowsWhenPaging: false,
          toolbarButtonAlignment: "left",
        }}
      />
    </Grid>
  );
};

export default AdminActivityList;
