import React, { useState } from "react";
import { authUri } from "../../modules/actions";

const Login = () => {
  const uriHandler = (e) => {
    window.location = authUri(e.target.value, "http://localhost:3000", "login");
  };

  return (
    <div className="login">
      <button onClick={(e) => uriHandler(e)} value={"google"}>
        google
      </button>
      <button onClick={(e) => uriHandler(e)} value={"spotify"}>
        spotify
      </button>
      <button onClick={(e) => uriHandler(e)} value={"kakao"}>
        kakao
      </button>
    </div>
  );
};

export default Login;