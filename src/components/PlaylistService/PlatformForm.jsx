import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

import { authUri, getPlatformToken, refreshAccessToken } from "../../modules/actions";
import { Context } from "../../context";
import "./Convert.css";

const in30Minutes = 1 / 48;
const cookiePath = "/convert";

const PlatformForm = ({ platform, platformHandler, type }) => {
  const { dispatch } = useContext(Context);

  useEffect(() => {
    return () => {
      console.log("remove");
      Cookies.remove("source", { path: cookiePath });
      Cookies.remove("destination", { path: cookiePath });
    };
  }, []);

  useEffect(() => {
    const cookie = Cookies.get(type);
    if (cookie) {
      confirmToken(cookie, setDataCallback(cookie));
    }
  }, []);

  const confirmToken = (value, callback) => {
    getPlatformToken(value).then((response) => {
      callback(response);
    });
  };

  const setDataCallback = (value) => (state) => {
    if (state) {
      platformHandler(value, type);
    }
  };

  const getTokenCallback = (value) => (state) => {
    Cookies.set(type, value, { expires: in30Minutes, path: cookiePath });
    if (state === "NOT_REQUIRED" || state === "REQUIRED_REFRESH_ACCESS_TOKEN") {
      refreshAccessToken(value, dispatch).then(() => {
        confirmToken(value, setDataCallback(value));
      });
    } else if (state === "REQUIRED_OAUTH") {
      window.location = authUri(value, "http://localhost:3000/convert", "token");
    }
  };

  const activeBtnHandler = (value) => {
    return platform[type] === value || platform["source"] === value; //소스에 선택되었거나 대상에 선택되었으면 비활성화
  };

  const onPlatform = (value) => {
    confirmToken(value, getTokenCallback(value));
  };

  const onUpload = (value) => {
    setDataCallback(value)(true);
  };

  return (
    <div>
      {type} : {platform[type]}
      <button disabled={activeBtnHandler("spotify")} onClick={() => onPlatform("spotify")}>
        spotify
      </button>
      <button disabled={activeBtnHandler("google")} onClick={() => onPlatform("google")}>
        google
      </button>
      {type === "destination" && (
        <button disabled={activeBtnHandler("upload")} onClick={() => onUpload("upload")}>
          upload
        </button>
      )}
    </div>
  );
};

export default PlatformForm;
