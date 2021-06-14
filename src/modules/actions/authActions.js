import axios from "axios";
import jwt from "jsonwebtoken";
import moment from "moment";

export const loginByPlatform = async (params, dispatch) => {
  const { code, type, platform, redirectUrl } = params;
  const redirectUri = `${redirectUrl}?platform=${platform}&type=${type}`;

  const options = {
    method: "POST",
    url: `/auth/${platform}/login`,
    params: { code, redirectUri },
  };
  try {
    const response = await axios(options);
    const { accessToken } = response.data;
    const payload = jwt.verify(accessToken, process.env.REACT_APP_JWT_SECRET);
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    console.log("loginByPlatform", accessToken);

    // dispatch({ type: "LOGIN_SUCCESS", payload, accessToken });
    dispatch({ type: "LOGIN_SUCCESS", payload });
  } catch (error) {
    //verify실패
    //서버 에러
    // dispatch({ type: "LOGIN_FAIL", message: error.data.message });
    dispatch({ type: "LOGIN_FAIL", message: error });
  }
};

export const generatePlatformToken = async (params, dispatch) => {
  const { code, type, platform, redirectUrl } = params;
  const redirectUri = `${redirectUrl}?platform=${platform}&type=${type}`;
  const options = {
    method: "POST",
    url: `/auth/${platform}/token`,
    params: { code, redirectUri },
  };
  try {
    await axios(options);
    console.log("generatePlatformToken");

    dispatch({ type: "TOKEN_SUCCESS", platform });
  } catch (error) {
    // dispatch({ type: "TOKEN_FAIL", message: error.data.message });
    console.log(error);
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
    console.log("getPlatformToken", state);
    return { state, accessToken, refreshToken };
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const refreshPlatformAccessToken = async (platform) => {
  const options = {
    method: "POST",
    url: `/auth/${platform}/refresh`,
  };
  try {
    console.log("refreshAccessToken");
    await axios(options);
    return { state: true };
  } catch (error) {
    console.log(error);
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
    console.log("loginByToken", accessToken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    // dispatch({ type: "LOGIN_SUCCESS", payload, accessToken });
    dispatch({ type: "LOGIN_SUCCESS", payload });
  } catch (error) {
    // dispatch({ type: "LOGIN_FAIL", message: error.data.message });
    console.log(error);
    dispatch({ type: "LOGIN_FAIL", message: error.data });
  }
};

export const logout = async () => {
  const options = {
    method: "DELETE",
    url: `/auth/logout`,
  };
  try {
    console.log("logout");
    await axios(options);
    return;
  } catch (error) {
    console.log(error);
  }
};

export const signOut = async () => {
  const options = {
    method: "DELETE",
    url: `/auth`,
  };

  try {
    console.log("signOut");
    await axios(options);
    return;
  } catch (error) {
    console.log(error);
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
      console.log("exp", expiresIn, (expiresIn - moment().unix() - 60) * 1000);
      const response = await axios(options);
      const { accessToken } = response.data;
      const payload = jwt.verify(accessToken, process.env.REACT_APP_JWT_SECRET);
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      console.log("refreshTokenSilent", accessToken);

      dispatch({ type: "LOGIN_SUCCESS", payload });
    } catch (error) {
      console.log(error);
      console.log(error);
      dispatch({ type: "LOGIN_FAIL", message: error.data });
    }
  }, (expiresIn - moment().unix() - 60) * 1000);

  return () => clearInterval(interval);
};
