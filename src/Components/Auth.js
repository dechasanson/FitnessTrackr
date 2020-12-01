import React, { useState } from "react";

import { auth, setToken } from "../api";

const Auth = (props) => {
  const { isLoggedIn, setIsLoggedIn } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  return (
    <form className="auth" onSubmit={(event) => event.preventDefault()}>
      <h3>Log-In or Sign-Up</h3>
      {errorMessage ? <h5 className="error">{errorMessage}</h5> : null}
      <input
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="username"
        className="login"
      />
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="password"
        className="login"
      />
      <button
        onClick={(event) => {
          event.preventDefault();
          auth(username, password, true).then((result) => {
            if (result.error) {
              setErrorMessage(result.error);
            }

            console.log("This should be the successful response:", result);
            setToken(result.token);
            setIsLoggedIn(true);
            console.log("User is logged in:", isLoggedIn);
          });
        }}
      >
        Register
      </button>
      <button
        onClick={async (event) => {
          event.preventDefault();
          auth(username, password).then((result) => {
            if (result.error) {
              setErrorMessage(result.error);
            }
            setIsLoggedIn(true);
            console.log("User is logged in:", isLoggedIn);
          });
        }}
      >
        Log In
      </button>
    </form>
  );
};

export default Auth;
