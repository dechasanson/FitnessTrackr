import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { fetchAPI, BASE_URL } from "./api";
import {
  MyActivities,
  Activities,
  MyRoutines,
  Routines,
  Title,
  Auth,
} from "./Components";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { clearToken } from "./api";

const App = () => {
  const [routineList, setRoutineList] = useState([]);
  const [activityList, setActivityList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState("");

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
        <h1>Welcome to Fitness Tracker</h1>
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
          {isLoggedIn ? (
            <>
              <div className="logout">
                <h1 className="loginMessage">{message}</h1>
                <span>
                  <button
                    className="logout-button"
                    onClick={() => {
                      clearToken();
                      setIsLoggedIn(false);
                      setMessage("");
                    }}
                  >
                    LOG OUT
                  </button>
                </span>
              </div>
            </>
          ) : (
            <Auth
              setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={isLoggedIn}
              message={message}
              setMessage={setMessage}
            />
          )}
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
            routineList={routineList}
            setRoutineList={setRoutineList}
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
