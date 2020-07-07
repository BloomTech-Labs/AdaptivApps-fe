import React from "react";
import { useQuery } from "react-apollo";
import { GET_USERS } from "./graphql";
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
  const { data, error, loading } = useQuery(GET_USERS);
  const classes = useStyles();

  if (loading) return <CircularProgress className={classes.loadingSpinner} />;
  if (error) return `Error! ${error.message}`;

  return (
    <Container className={classes.root}>
      {data && data?.profiles ? (
        <MaterialTable
          title="Registered Users"
          data={data?.profiles}
          columns={[
            {
              title: "Email",
              field: "email",
              render: rowData => <p className={classes.dataEntry}>{rowData.email}</p>,
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
              title: "City",
              field: "city",
              render: rowData => <p className={classes.dataEntry}>{rowData.city}</p>,
            },
            {
              title: "State",
              field: "state",
              render: rowData => <p className={classes.dataEntry}>{rowData.state}</p>,
            },
            {
              title: "Country",
              field: "country",
              render: rowData => <p className={classes.dataEntry}>{rowData.country}</p>,
            },
            {
              title: "Postal Code",
              field: "postalCode",
              render: rowData => <p className={classes.dataEntry}>{rowData.postalCode}</p>,
            },
            {
              title: "Address1",
              field: "address1",
              render: rowData => <p className={classes.dataEntry}>{rowData.address1}</p>,
            },
            {
              title: "Address2",
              field: "Address2",
              render: rowData => <p className={classes.dataEntry}>{rowData.firstaddress2}</p>,
            },
            {
              title: "Gender",
              field: "gender",
              render: rowData => <p className={classes.dataEntry}>{rowData?.extProfile?.gender}</p>,
            },
            {
              title: "Birthday",
              field: "birthday",
              render: rowData => <p className={classes.dataEntry}>{rowData?.extProfile?.birthday}</p>,
            },
            {
              title: "T-Shirt Size",
              field: "tShirtSize",
              render: rowData => <p className={classes.dataEntry}>{rowData?.extProfile?.tShirtSize}</p>,
            },
            {
              title: "Virtual Ride",
              field: "virtualRide",
              render: rowData => (
                <p className={classes.dataEntry}>{rowData?.demographicProfile?.virtualRide}</p>
              ),
            },
            {
              title: "Virtual Ride Platforms",
              field: "virtualRidePlatforms",
              render: rowData => (
                <p className={classes.dataEntry}>{rowData?.demographicProfile?.virtualRidePlatforms}</p>
              ),
            },
            {
              title: "X-Box GamePass",
              field: "xBoxGamePass",
              render: rowData => (
                <p className={classes.dataEntry}>{rowData?.demographicProfile?.xBoxGamePass}</p>
              ),
            },
            {
              title: "Video Game Familiarity",
              field: "videoGameFamiliarity",
              render: rowData => (
                <p className={classes.dataEntry}>{rowData?.demographicProfile?.videoGameFamiliarity}</p>
              ),
            },
          ]}
          options={{
            tableLayout: "auto",
            exportButton: true,
            selection: true,
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
