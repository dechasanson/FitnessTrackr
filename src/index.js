import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Activities, Routines, Auth } from "./Components";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { clearToken } from "./api";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState("");

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
