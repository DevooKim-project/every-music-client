import React, { useContext, useState, useEffect } from "react";
import Cookie from "js-cookie";

import { Context } from "../context";
import { loginByPlatform, loginByToken } from "../modules/actions";
import { authUri } from "../modules/actions";

function Auth({ platform }) {
  const [uri, setUri] = useState();

  useEffect(() => {
    setUri(authUri(platform));
  }, [platform]);

  return <a href={uri}>{platform}</a>;
}

function Login() {
  const [platform, setPlatform] = useState(new URLSearchParams(window.location.search).get("platform"));
  const [code, setCode] = useState(new URLSearchParams(window.location.search).get("code"));
  const [refreshToken, setRefreshToken] = useState(Cookie.get("refreshToken"));
  const { dispatch } = useContext(Context);

  // useEffect(() => {
  //   if (refreshToken) {
  //     loginByToken(dispatch);
  //     // window.history.pushState({}, null, `/`);
  //     window.history.go(1);
  //   }
  // }, [refreshToken]);

  useEffect(() => {
    if (code) {
      loginByPlatform(code, platform, dispatch);
      window.history.pushState({}, null, `/`);
    }
  }, [code]);

  return (
    <div>
      <Auth platform="google" />
      <Auth platform="spotify" />
      <Auth platform="kakao" />
    </div>
  );
}

export default React.memo(Login);
