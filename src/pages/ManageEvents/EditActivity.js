import React from "react";
// Reach Router imports
import { useParams, Link } from "@reach/router";
// Apollo-GraphQL imports
import { useMutation, useQuery } from "react-apollo";
import { UPDATE_ACTIVITY, GET_ACTIVITY } from "./graphql";
// Component imports
import ActivityForm from "./ActivityForm";
import Activities from "./Activities";
// Material-UI imports
import { makeStyles, Box, Typography, Container } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    width: "90%",
    marginTop: "3.1rem",
    fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
  },
  headingBox: {
    margin: "0 0 2rem 3rem",
    borderColor: "#D3D3D3",
  },
  linkBack: {
    color: "#202020",
    fontSize: "1.8rem",
    fontWeight: 530,
    display: "flex",
    alignItems: "center",
    marginBottom: "1.6rem",
    marginLeft: "0.3rem",
    textDecoration: "none",
  },
  loadingSpinner: {
    position: "absolute",
    top: "50%",
    right: "50%",
    color: "#2763FF",
  },
  activityCreation: {
    marginLeft: ".5rem",
    display: "flex",
  },
});

export default function EditActivity() {
  const classes = useStyles();
  const { activityId } = useParams();
  const { data, refetch } = useQuery(GET_ACTIVITY, {
    variables: { id: activityId },
  });
  const [updateActivity, { error, loading }] = useMutation(UPDATE_ACTIVITY);

  if (loading) return <CircularProgress className={classes.loadingSpinner} />;
  if (error) return `Error! ${error.message}`;

  return (
    <main className={classes.root}>
      <Box className={classes.headingBox} borderBottom={2}>
        <Typography className={classes.heading} variant="h1" gutterBottom>
          Edit Activity
        </Typography>
      </Box>
      <Container className={classes.activityCreation}>
        <Box>
          <ActivityForm
            updateActivity={updateActivity}
            activityId={activityId}
            data={data}
            loading={loading}
            refetch={refetch}
          />
        </Box>
        <Box>
          <Activities refetch={refetch} />
        </Box>
      </Container>
    </main>
  );
}
