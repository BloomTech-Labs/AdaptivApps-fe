import React from "react";
import AdminActivityList from "../pages/ManageEvents/AdminActivityList";
import { create, act } from "react-test-renderer";
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

beforeEach(() => {});

it("renders admin activity list (table) correctly", async () => {
  const event = {
    event_id: 123,
    title: "Test Event",
    startDate: "3/25/20",
    endDate: "3/26/20",
    location: "Test Location",
    activities: [
      {
        id: 12345,
        name: "Test Activity",
        startDate: "3/25/20",
        location: "Test Location",
        startTime: "8:00AM",
      },
    ],
  };
  let tree;
  act(() => {
    tree = create(
      <ApolloProvider client={client}>
        <AdminActivityList event={event} />
      </ApolloProvider>
    );
  });
  expect(tree.toJSON()).toMatchSnapshot();
});
