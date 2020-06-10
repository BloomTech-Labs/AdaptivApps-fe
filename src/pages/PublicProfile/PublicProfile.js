import React from "react";
import { useParams } from "@reach/router";
import { useQuery } from "react-apollo";
import { GET_USER_PROFILE } from "../PublicProfile/graphql";

import CircularProgress from "@material-ui/core/CircularProgress";

export default function PublicProfile() {
  const { userName } = useParams();
  const { data, loading, error } = useQuery(GET_USER_PROFILE, {
    variables: { userName: userName },
  });
  if (loading) return <CircularProgress />;
  if (error) return `Error! ${error.message}`;
  return (
    <div>
      <h1>Public profile is working!</h1>
    </div>
  );
}
