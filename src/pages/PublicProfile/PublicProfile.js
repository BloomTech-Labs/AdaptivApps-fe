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
    <>
      {data.profile.private === true || data.profile.userName === null ? (
        <p>
          {" "}
          Sorry this user has not set up their account yet, or their profile is
          set to private.
        </p>
      ) : (
        <div>
          <h1>Public profile is working!</h1>
        </div>
      )}
    </>
  );
}
