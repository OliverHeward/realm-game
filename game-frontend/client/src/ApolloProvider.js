import React, { useContext } from "react";
import App from "./App";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider, ApolloLink } from "@apollo/react-hooks";
import { setContext } from "@apollo/client/link/context";

import { withClientState } from "apollo-link-state";
import jwtDecode from "jwt-decode";

const cache = new InMemoryCache();

const httpLink = createHttpLink({
  uri: "http://localhost:5000",
});

const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");

  if (token) {
    const IS_LOGGED_IN = gql`
      query User {
        userLoggedIn @client
        userId @client
        userObject @client
      }
    `;

    client.writeQuery({
      query: IS_LOGGED_IN,
      data: {
        userLoggedIn: !!localStorage.getItem("jwtToken"),
        userId: jwtDecode(localStorage.getItem("jwtToken")).id,
        userObject: jwtDecode(localStorage.getItem("jwtToken")),
      },
    });
  }

  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
  resolvers: {},
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
