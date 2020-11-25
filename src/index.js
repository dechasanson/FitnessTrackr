import React from "react";
import ReactDOM from "react-dom";
import { Activities, Routines } from "./Components";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <div id="App">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/Components/Activities">Activities</Link>
        <Link to="/Components/Routines">Routines</Link>
      </nav>
      <main>
        <Route path="/">
          <h1>Fitness Tracker home page</h1>
        </Route>
        <Route
          path="/Components/Activities"
          render={() => {
            return <Activities />;
          }}
        />

        <Route
          path="/Components/Routines"
          render={() => {
            return <Routines />;
          }}
        />
      </main>
    </div>
  );
};

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("app")
);
