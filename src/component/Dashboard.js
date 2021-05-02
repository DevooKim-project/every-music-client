import React, { useContext, useCallback, useEffect } from "react";
import Cookie from "js-cookie";

// import { AuthDispatch } from "./App";
import { loginByPlatform, loginByToken, refreshTokenSilent } from "../modules/actions";
import { Context } from "../context";

export default React.memo(function Dashboard() {
  // const dispatch = useContext(AuthDispatch);
  const {
    state: { payload },
    dispatch,
  } = useContext(Context);
  // const { payload } = state;

  useEffect(() => {
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
});
