import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Activities, Routines, Auth } from "./Components";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { clearToken, getToken } from "./api";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
  return (
    <div className="App">
      <header>
        <h1>Welcome to Fitness Tracker</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/Components/Activities">Activities</Link>
          <Link to="/Components/Routines">Routines</Link>
        </nav>
      </header>
      <main>
        <Route path="/">
          <h1>Home</h1>
          {isLoggedIn ? (
            <>
              <div className="logout">
                <h1 className="loginMessage">Thanks for logging in!</h1>
                <span>
                  <button
                    className="logout-button"
                    onClick={() => {
                      clearToken();
                      setIsLoggedIn(false);
                    }}
                  >
                    LOG OUT
                  </button>
                </span>
              </div>
            </>
          ) : (
            <Auth setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
          )}
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
