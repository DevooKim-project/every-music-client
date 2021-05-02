import axios from "axios";
import jwt from "jsonwebtoken";
import moment from "moment";

export const loginByPlatform = async (code, platform, dispatch) => {
  const options = {
    method: "POST",
    url: `/auth/${platform}/login/callback`,
    params: { code },
  };
  try {
    const response = await axios(options);
    const { accessToken } = response.data;
    const payload = jwt.verify(accessToken, process.env.REACT_APP_JWT_SECRET);
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    console.log("loginByPlatform", accessToken);

    dispatch({ type: "LOGIN_SUCCESS", payload, accessToken });
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
    url: `/auth/${platform}/token/callback`,
    params: { code },
  };
  try {
    await axios(options);
    console.log("getPlatformToken");

    dispatch({ type: "TOKEN_SUCCESS" });
  } catch (error) {
    dispatch({ type: "TOKEN_FAIL", message: error.data.message });
  }
};

export const loginByToken = async (dispatch) => {
  const options = {
    method: "POST",
    url: `/auth/login`,
  };
  try {
    const response = await axios(options);
    const { accessToken } = response.data;
    const payload = jwt.verify(accessToken, process.env.REACT_APP_JWT_SECRET);
    console.log("loginByToken", accessToken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    dispatch({ type: "LOGIN_SUCCESS", payload, accessToken });
  } catch (error) {
    // dispatch({ type: "LOGIN_FAIL", message: error.data.message });
    console.log(error);
    dispatch({ type: "LOGIN_FAIL", message: error.data });
  }
};

export const refreshTokenSilent = async (expiresIn, dispatch) => {
  const options = {
    method: "POST",
    url: `/auth/refresh`,
  };
  console.log("refreshSilent");
  const interval = setInterval(async () => {
    try {
      console.log("exp", expiresIn);
      const response = await axios(options);
      const { accessToken } = response.data;
      const payload = jwt.verify(accessToken, process.env.REACT_APP_JWT_SECRET);
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      console.log("refreshTokenSilent", accessToken);

      dispatch({ type: "LOGIN_SUCCESS", payload, accessToken });
    } catch (error) {
      console.log(error);
      dispatch({ type: "LOGIN_FAIL", message: error.data.message });
    }
  }, (expiresIn - moment().unix()) * 1000);

  return () => clearInterval(interval);
};
