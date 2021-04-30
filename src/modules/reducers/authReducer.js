export const initialState = {
  isLoggedIn: false,
  payload: null,
  error: false,
  message: null,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        isLoggedIn: true,
        payload: action.payload,
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
