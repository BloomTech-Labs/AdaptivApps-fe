import React from "react";
import ActivityCard from "../pages/AddActivity/ActivityCard";
import renderer from "react-test-renderer";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { getIdTokenClaims } from "../config/react-auth0-spa";

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  credentials: "same-origin",
  request: async operation => {
    const token = await getIdTokenClaims();
    // Attach token to headers
    operation.setContext(context => ({
      headers: {
        ...context.headers,
        Authorization: token.__raw,
      },
    }));
  },
});

it("renders activity card correctly", () => {
  const activity = {
    name: "Test Activity",
    startDate: "3/25/20",
    location: "Test Location",
    startTime: "8:00AM",
  };
  const tree = renderer
    .create(
      <ApolloProvider client={client}>
        <ActivityCard activity={activity} />
      </ApolloProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
