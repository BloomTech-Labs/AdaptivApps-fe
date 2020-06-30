import React from "react";
import { useQuery } from "react-apollo";
import { GET_EVENTS_ATTENDEES } from "./graphql";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Container, makeStyles } from "@material-ui/core";
import MaterialTable from "material-table";
import DetailPanel from './DetailPanel';

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "1rem",
    '& .MuiTypography-root': {
      color: 'black'
    },
    '& .MuiCheckbox-colorSecondary.Mui-checked': {
      color: 'black'
    }
  },
  loadingSpinner: {
    position: "absolute",
    top: "50%",
    right: "50%",
    color: "#2763FF",
  },
  dataEntry: {
    fontSize: "1.5rem",
  }
});

// A list of users. Can be customized using material table.
// Docs here https://material-table.com/
const UsersList = () => {
  const { data, error, loading } = useQuery(GET_EVENTS_ATTENDEES);
  const classes = useStyles();

  if (loading) return <CircularProgress className={classes.loadingSpinner} />;
  if (error) return `Error! ${error.message}`;
  console.log('oh hi', data)
  return (
    <Container className={classes.root}>
      {data && data?.events ? (
        <MaterialTable
          title="Events and Attendees"
          data={data?.events}
          columns={[
            {
              title: "Event Name",
              field: "title",
              render: rowData => <p className={classes.dataEntry}>{rowData.title}</p>,
            },
            {
              title: "Start Date",
              field: "startDate",
              render: rowData => <p className={classes.dataEntry}>{rowData.startDate}</p>,
            },
            {
              title: "End Date",
              field: "lastName",
              render: rowData => <p className={classes.dataEntry}>{rowData.endDate}</p>,
            },
            {
              title: "Location",
              field: "location",
              render: rowData => <p className={classes.dataEntry}>{rowData.location}</p>,
            },
          ]}
          detailPanel={rowData => {
            return (
              <DetailPanel attendees={rowData.attendees} />
            )
          }}
          options={{
            tableLayout: "auto",
            search: true,
            showTitle: false,
            paging: true,
            emptyRowsWhenPaging: false,
            filtering: true,
            headerStyle: {
              fontSize: "4.5rem"
            },
            exportAllData: true
          }}
        />
      ) : null}
    </Container>
  );
};

export default UsersList;


// Options for table commented out for now
// exportButton: true,
// selection: true,