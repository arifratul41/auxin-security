import React, { useState } from "react";
import { useHistory } from "react-router";
import { getAuth, useAuth } from "..";
import { Button, TextField } from "@mui/material";

const Login = () => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const { dispatch } = useAuth();
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
        <div className={`min-h-screen flex flex-row`}>
          <div className={` `}>
            <img
              alt={"Covid_icon"}
              src={`background_icon.png`}
              className={`ml-64 mt-28 max-w-md h-auto aspect-auto`}
            />
          </div>
          <div className={`mx-auto my-auto flex flex-col gap-10`}>
            <div className={`mb-5 text-3xl`}>Sign In</div>
            <TextField
              placeholder={"Any Username"}
              required
              aria-autocomplete={"none"}
              style={{ width: "420px" }}
              label="Username"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
              required
              placeholder={"Any Password"}
              aria-autocomplete={"none"}
              style={{ width: "420px", color: "white" }}
              label="Password"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              type={"password"}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type={"submit"}
              style={{ color: "white" }}
              size={"large"}
              variant={"contained"}
              onSubmit={handleSubmit}
            >
              Log in
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
