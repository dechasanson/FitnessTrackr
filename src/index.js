import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { fetchAPI, BASE_URL } from "./api";
import {
  MyActivities,
  Activities,
  MyRoutines,
  Routines,
  Title,
} from "./Components";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const App = () => {
  const [routineList, setRoutineList] = useState([]);
  const [activityList, setActivityList] = useState([]);

  useEffect(() => {
    fetchAPI(BASE_URL + `/routines`)
      .then((data) => {
        setRoutineList(data);
        console.log(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetchAPI(BASE_URL + `/activities`)
      .then((data) => {
        setActivityList(data);
        console.log(data);
      })
      .catch(console.error);
  }, []);
  return (
    <div className="App">
      <header>
        <nav>
          <Link to="/">Home </Link>
          <Link to="/Components/Activities"> Activities </Link>
          <Link to="/Components/MyActivities"> My Activities </Link>
          <Link to="/Components/Routines"> Routines </Link>
          <Link to="/Components/MyRoutines"> My Routines</Link>
        </nav>
      </header>
      <main>
        <Route exact path="/">
          <Title />
        </Route>
        <Route exact path="/Components/Activities">
          <Activities activityList={activityList} />
        </Route>
        <Route exact path="/Components/MyActivities">
          <MyActivities
            activityList={activityList}
            setActivityList={setActivityList}
          />
        </Route>
        <Route exact path="/Components/Routines">
          <Routines routineList={routineList} />
        </Route>
        <Route exact path="/Components/MyRoutines">
          <MyRoutines
            activityList={activityList}
            setActivityList={setActivityList}
          />
        </Route>
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
