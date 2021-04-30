import React, { useContext, useCallback, useEffect } from "react";
import Cookie from "js-cookie";

import { AuthDispatch } from "./App";
import { loginByPlatform, loginByToken, refreshTokenSilent } from "./modules/actions";

export default function Dashboard({ state }) {
  const dispatch = useContext(AuthDispatch);
  const { payload } = state;

  useEffect(() => {
    console.log("refresh", payload.exp);
    refreshTokenSilent(payload.exp, dispatch);
  }, [payload]);

  const removeCookie = useCallback(() => {
    Cookie.remove("refreshToken");
    window.location = "/";
  });

  return (
    <div>
      <p>유저: {payload.name}</p>
      <button onClick={removeCookie}>로그아웃</button>
    </div>
  );
}
