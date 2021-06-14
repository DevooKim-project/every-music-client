import { createContext, useReducer } from "react";

export const initialState = {
  isLoggedIn: false,
  platformToken: null,
  payload: null,
  error: false,
  message: null,
};

const Context = createContext({});

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
        payload: action.payload,
      };

    case "TOKEN_SUCCESS":
      return {
        ...state,
        platformToken: action.platform,
      };

    case "LOGIN_FAIL":
    case "TOKEN_FAIL":
      return {
        ...state,
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
