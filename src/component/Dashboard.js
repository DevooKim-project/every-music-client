import React, { useContext, useCallback, useEffect } from "react";
import Cookie from "js-cookie";

import { refreshTokenSilent } from "../modules/actions";
import { Context } from "../context";
import { Link } from "react-router-dom";

export default React.memo(function Dashboard() {
  const {
    state: { payload },
    dispatch,
  } = useContext(Context);

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
      <Link to="/library">My Library</Link>
    </div>
  );
});
