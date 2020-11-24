import React from "react";

import ReactDOM from "react-dom";

import { hitAPI } from "./api";

import { Activities, Routines } from "./Components";

const App = () => {
  return (
    <>
      <h1>Fitness Tracker</h1>
      <Activities />
      <Routines />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
