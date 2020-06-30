import React from "react";
import { makeStyles } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    width: "90%",
    marginLeft: "10%",
  },
}));

const DetailPanel = props => {
  const { attendees } = props;
  const classes = useStyles();
  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table className={classes.table} aria-label="table of users">
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attendees.map((attendee) => (
            <TableRow key={attendee.eventProfile.id}>
              <TableCell component="th" scope="row">{attendee.eventProfile.userName}</TableCell>
              <TableCell align="right">{attendee.eventProfile.firstName}</TableCell>
              <TableCell align="right">{attendee.eventProfile.lastName}</TableCell>
              <TableCell align="right">{attendee.eventProfile.email}</TableCell>
              <TableCell align="right">{attendee.eventProfile.phoneNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DetailPanel;
