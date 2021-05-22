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
  }, [payload]);

  useEffect(() => {
    if (code) {
      if (type === "login") {
        loginByPlatform({ code, type, platform }, dispatch);
        window.history.pushState({}, null, `/`);
      }
      if (type === "token") {
        generatePlatformToken({ code, type, platform }, dispatch);
        window.close();
        // window.history.pushState({}, null, "/convert");
      }
    }
  }, [code]);
};

export default auth;
