import axios from "axios";
import jwt from "jsonwebtoken";
import moment from "moment";

import { errorMessage } from "./errorActions";

export const getAuthUrl = async (params) => {
  const { type, platform, redirectUrl } = params;
  const redirectUri = `${redirectUrl}?platform=${platform}&type=${type}`;

  const options = {
    method: "GET",
    url: `/auth/url/${platform}`,
    params: { redirectUri },
  };
  try {
    const response = await axios(options);
    const { authorizationUrl } = response.data;
    return authorizationUrl;
  } catch (error) {
    throw Error(errorMessage(error));
  }
};

export const loginByPlatform = async (params, dispatch) => {
  const { code, type, platform, redirectUrl } = params;
  const redirectUri = `${redirectUrl}?platform=${platform}&type=${type}`;

  const options = {
    method: "POST",
    url: `/auth/login/${platform}`,
    params: { code, redirectUri },
  };
  try {
    const response = await axios(options);
    const { accessToken } = response.data;
    const payload = jwt.verify(accessToken, process.env.REACT_APP_JWT_SECRET);
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    dispatch({ type: "LOGIN_SUCCESS", payload });
  } catch (error) {
    dispatch({ type: "LOGIN_FAIL", message: error });
  }
};

export const generatePlatformToken = async (params, dispatch) => {
  const { code, type, platform, redirectUrl } = params;
  const redirectUri = `${redirectUrl}?platform=${platform}&type=${type}`;
  const options = {
    method: "POST",
    url: `/auth/${platform}`,
    params: { code, redirectUri },
  };
  try {
    await axios(options);
    dispatch({ type: "TOKEN_SUCCESS", platform });
  } catch (error) {
    dispatch({ type: "TOKEN_FAIL", message: error });
  }
};

export const getPlatformToken = async (platform) => {
  const options = {
    method: "GET",
    url: `/auth/${platform}`,
  };

  try {
    const response = await axios(options);
    const { accessToken, refreshToken } = response.data;
    let state;
    if (!accessToken && !refreshToken) {
      state = "REQUIRED_OAUTH";
    } else if (!accessToken && refreshToken) {
      state = "REQUIRED_REFRESH_ACCESS_TOKEN";
    } else {
      state = "NOT_REQUIRED";
    }
    return { state, accessToken, refreshToken };
  } catch (error) {
    return false;
  }
};

export const refreshPlatformAccessToken = async (platform) => {
  const options = {
    method: "POST",
    url: `/auth/refresh-token/${platform}`,
  };
  try {
    console.log("refreshAccessToken");
    await axios(options);
    return { state: true };
  } catch (error) {
    return { state: false };
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
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    dispatch({ type: "LOGIN_SUCCESS", payload });
  } catch (error) {
    dispatch({ type: "LOGIN_FAIL", message: error.data });
  }
};

export const logout = async () => {
  const options = {
    method: "POST",
    url: `/auth/logout`,
  };

  await axios(options);
  return;
};

export const signOut = async () => {
  const options = {
    method: "DELETE",
    url: `/auth`,
  };

  await axios(options);
  return;
};

export const refreshTokenSilent = async (expiresIn, dispatch) => {
  const options = {
    method: "POST",
    url: `/auth/refresh-token`,
  };
  const interval = setInterval(async () => {
    try {
      const response = await axios(options);
      const { accessToken } = response.data;
      const payload = jwt.verify(accessToken, process.env.REACT_APP_JWT_SECRET);
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      dispatch({ type: "LOGIN_SUCCESS", payload });
    } catch (error) {
      dispatch({ type: "LOGIN_FAIL", message: error.data });
    }
  }, (expiresIn - moment().unix() - 60) * 1000);

  return () => clearInterval(interval);
};
