import React from "react";

import ReactDOM from "react-dom";

import { hitAPI } from "./api";

import { Activities } from "./Components";

const App = () => {
  return (
    <>
      <h1>Hello World</h1>
      <Activities />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
