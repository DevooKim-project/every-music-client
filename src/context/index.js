import { createContext, useReducer } from "react";

export const initialState = {
  isLoggedIn: false,
  payload: null,
  accessToken: null,
  error: false,
  message: null,
};

const Context = createContext({});

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        isLoggedIn: true,
        payload: action.payload,
        accessToken: action.accessToken,
      };

    case "TOKEN_SUCCESS":
      return {
        isLoggedIn: true,
      };

    case "LOGIN_FAIL":
    case "TOKEN_FAIL":
      return {
        isLoggedIn: false,
        error: true,
        message: action.message,
      };

    default:
      return state;
  }
};

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };
