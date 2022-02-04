import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import client from "./apollo";
import App from "./components/App";

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById("root")
);
