import React, { useContext, useState, useEffect } from "react";

import { Context } from "../context";
import { generatePlatformToken, loginByPlatform, loginByToken } from "../modules/actions";
import { authUri } from "../modules/actions";

function Auth({ platform }) {
  const [uri, setUri] = useState();

  useEffect(() => {
    // setUri(authUri(platform, "login"));
    setUri(authUri(platform, "http://localhost:3000", "login"));
  }, [platform]);

  const uriHandler = () => {
    window.location = uri;
  };

  return <button onClick={uriHandler}>{platform}</button>;
}

function Login({ platforms }) {
  const code = new URLSearchParams(window.location.search).get("code");
  const platformQuery = new URLSearchParams(window.location.search).get("platform");
  const type = new URLSearchParams(window.location.search).get("type");
  const { dispatch } = useContext(Context);

  useEffect(() => {
    if (code) {
      if (type === "login") {
        loginByPlatform({ code, type: type, platform: platformQuery }, dispatch);
        window.history.pushState({}, null, `/`);
      }
      if (type === "token") {
        generatePlatformToken({ code, type: type, platform: platformQuery }, dispatch);
        // window.open("", "_self").close();
        window.history.pushState({}, null, "/convert");
      }
    }
  }, [code]);

  return (
    <div>
      {platforms.map((platform, idx) => (
        <Auth key={idx} platform={platform} />
      ))}
    </div>
  );
}

export default React.memo(Login);
