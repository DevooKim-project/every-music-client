import axios from "axios";
import jwt from "jsonwebtoken";
import moment from "moment";

export const loginByPlatform = async (params, dispatch) => {
  const { code, type, platform } = params;

  const options = {
    method: "POST",
    url: `/auth/${platform}/login`,
    params: { code, type },
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

export const getPlatformToken = async (params, dispatch) => {
  const { code, type, platform } = params;

  const options = {
    method: "POST",
    url: `/auth/${platform}/token`,
    params: { code, type },
  };
  try {
    await axios(options);
    console.log("getPlatformToken");

    dispatch({ type: "TOKEN_SUCCESS", platform });
  } catch (error) {
    // dispatch({ type: "TOKEN_FAIL", message: error.data.message });
    console.log(error);
    dispatch({ type: "TOKEN_FAIL", message: error });
  }
};

export const hasPlatformToken = async (platform) => {
  const options = {
    method: "GET",
    url: `/auth/${platform}`,
  };

  try {
    console.log("hasPlatformToken");
    const response = await axios(options);
    const { platformToken } = response.data;
    return platformToken;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const hasPlatformTokenInterval = async (platform) => {
  const asyncPromise = new Promise((resolve, reject) => {
    let count = 0;
    const interval = setInterval(async () => {
      try {
        console.log("hasPlatformTokenInterval");
        const value = await hasPlatformToken(platform);

        if (value) {
          resolve(value);
          clearInterval(interval);
        }

        if (count >= 10) {
          resolve(value);
          clearInterval(interval);
        }
        count += 1;
      } catch (error) {
        console.log(error);
        resolve(false);
        clearInterval(interval);
      }
    }, 1000);
  });

  const result = await asyncPromise;
  return result;
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
      // dispatch({ type: "LOGIN_FAIL", message: error.data.message });
      console.log(error);
      dispatch({ type: "LOGIN_FAIL", message: error.data });
    }
  }, (expiresIn - moment().unix() - 60) * 1000);

  return () => clearInterval(interval);
};
