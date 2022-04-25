import React from "react";

import { Login } from ".";

import "./authPage.css";

const AuthPage = () => (
  <div
    id="auth-layout"
    className="d-flex justify-content-center align-items-center"
  >
    <div className="p-4 bg-white rounded shadow">
      <div className="d-flex flex-column justify-content-center align-items-center mb-4">
        <div className="fs-4 fw-bold">Welcome</div>
        <div className="fs-5">Sign in to continue</div>
      </div>
      <div>
        <Login />
      </div>
    </div>
  </div>
);

export default AuthPage;
