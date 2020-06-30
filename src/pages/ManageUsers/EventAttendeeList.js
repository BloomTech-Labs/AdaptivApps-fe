import React from "react";
import { useQuery } from "react-apollo";
import { GET_EVENTS_ATTENDEES } from "./graphql";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Container, makeStyles } from "@material-ui/core";
import MaterialTable from "material-table";

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
    },
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

  const tableData = [];
  if (data && data.events) {
    for (let i = 0; i < data.events.length; i++) {
      let title = data.events[i].title;
      let startDate = data.events[i].startDate;
      let endDate = data.events[i].endDate;
      let location = data.events[i].location;
      for (let j = 0; j < data.events[i].attendees.length; j++) {
        let userName = data.events[i].attendees[j].eventProfile.userName;
        let firstName = data.events[i].attendees[j].eventProfile.firstName;
        let lastName = data.events[i].attendees[j].eventProfile.lastName;
        let email = data.events[i].attendees[j].eventProfile.email;
        let phoneNumber = data.events[i].attendees[j].eventProfile.phoneNumber;
        const currData = {
          title: title,
          startDate: startDate,
          endDate: endDate,
          location: location,
          userName: userName,
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber, phoneNumber
        };
        tableData.push(currData);
      }
    }
  }

  return (
    <Container className={classes.root}>
      {data && data?.events ? (
        <MaterialTable
          title="Events and Attendees"
          data={tableData}
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
              field: "endDate",
              render: rowData => <p className={classes.dataEntry}>{rowData.endDate}</p>,
            },
            {
              title: "Location",
              field: "location",
              render: rowData => <p className={classes.dataEntry}>{rowData.location}</p>,
            },
            {
              title: "User Name",
              field: "userName",
              render: rowData => <p className={classes.dataEntry}>{rowData.userName}</p>,
            },
            {
              title: "First Name",
              field: "firstName",
              render: rowData => <p className={classes.dataEntry}>{rowData.firstName}</p>,
            },
            {
              title: "Last Name",
              field: "lastName",
              render: rowData => <p className={classes.dataEntry}>{rowData.lastName}</p>,
            },
            {
              title: "Email",
              field: "email",
              render: rowData => <p className={classes.dataEntry}>{rowData.email}</p>,
            },
            {
              title: "Phone Number",
              field: "phoneNumber",
              render: rowData => <p className={classes.dataEntry}>{rowData.phoneNumber}</p>,
            },
          ]}
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
            exportButton: true,
            exportAllData: true,
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