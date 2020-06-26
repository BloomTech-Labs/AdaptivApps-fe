import React from "react";
import EventCreationForm from "../pages/CreateEvent/EventCreationForm";
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

it("renders event creation form correctly", () => {
  const tree = renderer
    .create(
      <ApolloProvider client={client}>
        <EventCreationForm />
      </ApolloProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
