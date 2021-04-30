import axios from "axios";
import jwt from "jsonwebtoken";
import moment from "moment";

export const loginByPlatform = async (code, platform, dispatch) => {
  const options = {
    method: "POST",
    url: `http://localhost:5000/auth/${platform}/login/callback`,
    params: { code },
  };
  try {
    const response = await axios(options);
    const { accessToken } = response.data;
    const payload = jwt.verify(accessToken, process.env.REACT_APP_JWT_SECRET);
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    dispatch({ type: "LOGIN_SUCCESS", payload });
  } catch (error) {
    //verify실패
    //서버 에러
    // dispatch({ type: "LOGIN_FAIL", message: error.data.message });
    dispatch({ type: "LOGIN_FAIL", message: error });
  }
};

export const getPlatformToken = async (code, platform, dispatch) => {
  const options = {
    method: "POST",
    url: `http://localhost:5000/auth/${platform}/token/callback`,
    params: { code },
  };
  try {
    await axios(options);
    dispatch({ type: "TOKEN_SUCCESS" });
  } catch (error) {
    dispatch({ type: "TOKEN_FAIL", message: error.data.message });
  }
};

export const loginByToken = async (dispatch) => {
  const options = {
    method: "POST",
    url: `http://localhost:5000/auth/login`,
  };
  try {
    const response = await axios(options);
    const { accessToken } = response.data;
    const payload = jwt.verify(accessToken, process.env.REACT_APP_JWT_SECRET);
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    dispatch({ type: "LOGIN_SUCCESS", payload });
  } catch (error) {
    dispatch({ type: "LOGIN_FAIL", message: error.data.message });
  }
};

export const refreshTokenSilent = async (expiresIn, dispatch) => {
  const options = {
    method: "POST",
    url: `http://localhost:5000/auth/refresh`,
  };
  const interval = setInterval(async () => {
    try {
      console.log("exp", expiresIn);
      const response = await axios(options);
      const { accessToken } = response.data;
      const payload = jwt.verify(accessToken, process.env.REACT_APP_JWT_SECRET);
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      dispatch({ type: "LOGIN_SUCCESS", payload });
    } catch (error) {
      console.log(error);
      dispatch({ type: "LOGIN_FAIL", message: error.data.message });
    }
  }, (expiresIn - moment().unix()) * 1000);

  return () => clearInterval(interval);
};
