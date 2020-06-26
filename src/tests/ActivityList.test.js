import React from "react";
import ActivityList from "../pages/AddActivity/ActivityList";
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

it("renders activity list correctly", () => {
  const event = {
    title: "Test Event",
    startDate: "3/25/20",
    endDate: "3/26/20",
    location: "Test Location",
  };
  const activities = [
    {
      id: 12345,
      name: "Test Activity",
      startDate: "3/25/20",
      location: "Test Location",
      startTime: "8:00AM",
    },
  ];
  const tree = renderer
    .create(
      <ApolloProvider client={client}>
        <ActivityList event={event} activities={activities} />
      </ApolloProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
