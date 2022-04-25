import React, { useState } from "react";
import { useHistory } from "react-router";

import { getAuth, useAuth } from "..";

const Login = () => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const { dispatch, state: authState } = useAuth();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username);
    getAuth(dispatch, { username, password }, (err) => {
      if (!err) history.push(`/`);
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="userName" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="userName"
            aria-describedby="userNameHelp"
            onChange={(e) => setUserName(e.target.value)}
          />
          <div id="userNameHelp" className="form-text">
            Provide any name
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            aria-describedby="passwordHelp"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div id="passwordHelp" className="form-text">
            Provide any password
          </div>
        </div>
        <div>
          <button className="float-end btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
