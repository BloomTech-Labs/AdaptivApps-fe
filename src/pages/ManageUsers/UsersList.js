import React from "react";
import { Container, makeStyles, TablePagination } from "@material-ui/core";

import { useQuery } from "react-apollo";
import { GET_USERS } from "./graphql";

import MaterialTable from "material-table";
import { AddBox, ArrowDownward } from "@material-ui/icons";
const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "1rem",
  },
});

// A list of users. Can be customized using material table.
// Docs here https://material-table.com/
const UsersList = () => {
  const { data, error, loading } = useQuery(GET_USERS);
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      {data && data?.profiles ? (
        <MaterialTable
          // components={{
          //   Pagination: props => (
          //     <TablePagination
          //       {...props}
          //       SelectProps={{
          //         style: {
          //           fontSize: "1.4rem",
          //         },
          //       }}
          //     />
          //   ),
          // }}
          title="Registered Users"
          data={data?.profiles}
          columns={[
            {
              title: "Email",
              field: "email",
              render: rowData => (
                <p
                  style={{
                    fontSize: "1.6rem",
                    width: "24rem",
                    overflow: "scroll",
                  }}
                >
                  {rowData.email}
                </p>
              ),
            },
            {
              title: "First Name",
              field: "firstName",
              render: rowData => (
                <p
                  style={{
                    fontSize: "1.6rem",
                    width: "8rem",
                    overflow: "scroll",
                  }}
                >
                  {rowData.firstName}
                </p>
              ),
            },
            {
              title: "Last Name",
              field: "lastName",
              render: rowData => (
                <p
                  style={{
                    fontSize: "1.6rem",
                    width: "12rem",
                    overflow: "scroll",
                  }}
                >
                  {rowData.lastName}
                </p>
              ),
            },
            {
              title: "City",
              field: "city",
              render: rowData => (
                <p
                  style={{
                    fontSize: "1.6rem",
                    width: "12rem",
                    overflow: "scroll",
                  }}
                >
                  {rowData.city}
                </p>
              ),
            },
            {
              title: "State",
              field: "state",
              render: rowData => (
                <p
                  style={{
                    fontSize: "1.6rem",
                    width: "12rem",
                    overflow: "scroll",
                  }}
                >
                  {rowData.state}
                </p>
              ),
            },
            {
              title: "Country",
              field: "country",
              render: rowData => (
                <p
                  style={{
                    fontSize: "1.6rem",
                    width: "8rem",
                    overflow: "scroll",
                  }}
                >
                  {rowData.country}
                </p>
              ),
            },
            {
              title: "Postal Code",
              field: "postalCode",
              render: rowData => (
                <p
                  style={{
                    fontSize: "1.6rem",
                    width: "8rem",
                    overflow: "scroll",
                  }}
                >
                  {rowData.postalCode}
                </p>
              ),
            },
            {
              title: "Address1",
              field: "address1",
              render: rowData => (
                <p
                  style={{
                    fontSize: "1.6rem",
                    width: "8rem",
                    overflow: "scroll",
                  }}
                >
                  {rowData.address1}
                </p>
              ),
            },
            {
              title: "Address2",
              field: "Address2",
              render: rowData => (
                <p
                  style={{
                    fontSize: "1.6rem",
                    width: "8rem",
                    overflow: "scroll",
                  }}
                >
                  {rowData.firstaddress2}
                </p>
              ),
            },
            {
              title: "Gender",
              field: "gender",
              render: rowData => (
                <p
                  style={{
                    fontSize: "1.6rem",
                    width: "8rem",
                    overflow: "scroll",
                  }}
                >
                  {rowData?.extProfile?.gender}
                </p>
              ),
            },
            {
              title: "Birthday",
              field: "birthday",
              render: rowData => (
                <p
                  style={{
                    fontSize: "1.6rem",
                    width: "8rem",
                    overflow: "scroll",
                  }}
                >
                  {rowData?.extProfile?.birthday}
                </p>
              ),
            },
            {
              title: "T-Shirt Size",
              field: "tShirtSize",
              render: rowData => (
                <p
                  style={{
                    fontSize: "1.6rem",
                    width: "8rem",
                    overflow: "scroll",
                  }}
                >
                  {rowData?.extProfile?.tShirtSize}
                </p>
              ),
            },
            {
              title: "Virtual Ride",
              field: "virtualRide",
              render: rowData => (
                <p
                  style={{
                    fontSize: "1.6rem",
                    width: "8rem",
                    overflow: "scroll",
                  }}
                >
                  {rowData?.demographicProfile?.virtualRide}
                </p>
              ),
            },
            {
              title: "Virtual Ride Platforms",
              field: "virtualRidePlatforms",
              render: rowData => (
                <p
                  style={{
                    fontSize: "1.6rem",
                    width: "8rem",
                    overflow: "scroll",
                  }}
                >
                  {rowData?.demographicProfile?.virtualRidePlatforms}
                </p>
              ),
            },
            {
              title: "X-Box GamePass",
              field: "xBoxGamePass",
              render: rowData => (
                <p
                  style={{
                    fontSize: "1.6rem",
                    width: "8rem",
                    overflow: "scroll",
                  }}
                >
                  {rowData?.demographicProfile?.xBoxGamePass}
                </p>
              ),
            },
            {
              title: "Video Game Familiarity",
              field: "videoGameFamiliarity",
              render: rowData => (
                <p
                  style={{
                    fontSize: "1.6rem",
                    width: "8rem",
                    overflow: "scroll",
                  }}
                >
                  {rowData?.demographicProfile?.videoGameFamiliarity}
                </p>
              ),
            },
          ]}
          options={{
            selection: true,
            search: true,
            showTitle: false,
            paging: true,
            emptyRowsWhenPaging: false,
            filtering: true,
            cellStyle: {
              fontSize: "1.2rem",
            },
            headerStyle: {
              fontSize: "1.2rem",
            },
          }}
        />
      ) : null}
    </Container>
  );
};

export default UsersList;
