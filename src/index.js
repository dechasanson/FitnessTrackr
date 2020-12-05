import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { fetchAPI, BASE_URL } from "./api";
import { Activities, MyRoutines, Routines, Auth, Search } from "./Components";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { clearToken } from "./api";
import Photo from "./kettles.jpg";

const App = () => {
  const [routineList, setRoutineList] = useState([]);
  const [activityList, setActivityList] = useState([]);
  const [myRoutines, setmyRoutines] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [filterTerm, setFilterTerm] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    fetchAPI(BASE_URL + `/routines`)
      .then((data) => {
        setRoutineList(data);
      })
      .catch(console.error);
  }, [isLoggedIn]);

  useEffect(() => {
    fetchAPI(BASE_URL + `/activities`)
      .then((data) => {
        setActivityList(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    async function fetchData() {
      const resp = await fetchAPI(BASE_URL + `/users/me`);
      const user = resp.id;
      setUser(user);
    }
    fetchData();
  }, [isLoggedIn]);

  console.log("the routineList is now:", routineList);

  const addNewRoutine = (newRoutine) => {
    return setRoutineList([newRoutine, ...routineList]);
  };

  return (
    <div className="App">
      <header>
        <h1>Welcome to FitnessTrackr</h1>
        <nav>
          <Link to="/">Home </Link>
          <Link to="/Activities"> Activities </Link>
          <Link to="/Routines"> Routines </Link>
          {isLoggedIn ? (
            <>
              {" "}
              <Link to="/MyRoutines"> My Routines</Link>
            </>
          ) : (
            ""
          )}
        </nav>

        {isLoggedIn ? (
          <>
            <div className="authenticated-nav">
              <h1 className="loginMessage">{message}</h1>

              <button
                className="logout-button"
                onClick={() => {
                  // clearToken();
                  setIsLoggedIn(false);
                  setMessage("");
                }}
              >
                LOG OUT
              </button>
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
      </header>
      <main>
        <Route exact path="/">
          <img className="homePhoto" src={Photo} alt="Photo of kettlebells" />
        </Route>
        <Route exact path="/Activities">
          <Search filterTerm={filterTerm} setFilterTerm={setFilterTerm} />
          <Activities
            activityList={activityList}
            isLoggedIn={isLoggedIn}
            setActivityList={setActivityList}
            filterTerm={filterTerm}
            setFilterTerm={setFilterTerm}
          />
        </Route>
        <Route exact path="/Routines">
          <Search filterTerm={filterTerm} setFilterTerm={setFilterTerm} />
          <Routines
            routineList={routineList}
            filterTerm={filterTerm}
            setFilterTerm={setFilterTerm}
          />
        </Route>
        <Route exact path="/MyRoutines">
          <MyRoutines
            routineList={routineList}
            setRoutineList={setRoutineList}
            myRoutines={myRoutines}
            setmyRoutines={setmyRoutines}
            addNewRoutine={addNewRoutine}
            user={user}
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
