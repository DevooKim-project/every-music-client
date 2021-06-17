import { useContext, useEffect } from "react";
import { Context } from "./context";

import {
  generatePlatformToken,
  loginByPlatform,
  loginByToken,
  refreshTokenSilent,
} from "./modules/actions";

const auth = (authConfigHandler) => {
  const {
    state: { isLoggedIn, payload },
    dispatch,
  } = useContext(Context);
  const code = new URLSearchParams(window.location.search).get("code");
  const platform = new URLSearchParams(window.location.search).get("platform");
  const type = new URLSearchParams(window.location.search).get("type");

  useEffect(() => {
    loginByToken(dispatch).then(() => {
      authConfigHandler();
    });
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      refreshTokenSilent(payload.exp, dispatch);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (code) {
      if (type === "login") {
        const currentUrl =
          window.location.protocol + "//" + window.location.host + window.location.pathname;
        loginByPlatform({ code, type, platform, redirectUrl: currentUrl }, dispatch);
        window.history.pushState({}, null, `/`);
      }
      if (type === "token") {
        const currentUrl =
          window.location.protocol + "//" + window.location.host + window.location.pathname;
        generatePlatformToken({ code, type, platform, redirectUrl: currentUrl }, dispatch);
        window.close();
      }
    }
  }, [code]);
};

export default auth;
