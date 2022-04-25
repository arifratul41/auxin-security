import React from "react";

const localStorageUser = localStorage.getItem("fakeUser");

const AuthContext = React.createContext();

const initialState = {
  user: localStorageUser ? JSON.parse(localStorageUser) : null,
  authLoading: false,
  error: "",
};

const authReducer = function (state, action) {
  switch (action.type) {
    case "AUTH_REQUEST":
      return {
        ...state,
        authLoading: true,
        error: "",
      };

    case "AUTH_SUCCESS":
      return {
        ...state,
        user: action.user,
        authLoading: false,
        error: "",
      };

    case "AUTH_FAIL":
      return {
        ...state,
        authLoading: false,
        error: action.error,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
      };

    default:
      break;
  }
};

export function AuthProvider(props) {
  const [state, dispatch] = React.useReducer(authReducer, initialState);
  const value = React.useMemo(() => [state, dispatch], [state]);

  return <AuthContext.Provider value={value} {...props} />;
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  const [state, dispatch] = context;

  return {
    state,
    dispatch,
  };
}

const requestAuth = (user) => ({
  type: "AUTH_REQUEST",
  user,
});

const successAuth = (user) => ({
  type: "AUTH_SUCCESS",
  user,
});

const failAuth = (err) => ({
  type: "AUTH_FAIL",
  error: err,
});

const getLogout = (user) => ({
  type: "LOGOUT",
  user,
});

export const getAuth = (dispatch, user, done = () => {}) => {
  dispatch(requestAuth(user));

  const authPromise = (user) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const { username, password } = user;
        if (username && password) resolve(user);
        else reject({ errorMsg: "Provide User Name and Password" });
      }, 300);
    });

  authPromise(user)
    .then((authUser) => {
      localStorage.setItem("fakeUser", JSON.stringify(authUser));
      dispatch(successAuth(authUser));
      done(null, authUser);
    })
    .catch((err) => {
      console.log(err);
      dispatch(failAuth(err));
      done(err);
    });
};

export const logout = (dispatch, done = () => {}) => {
  localStorage.removeItem("fakeUser");
  dispatch(getLogout(null));
  done();
};
