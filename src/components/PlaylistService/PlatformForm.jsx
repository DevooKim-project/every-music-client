import React from "react";
import {
  authUri,
  getPlatformToken,
  getPlaylistBoard,
  refreshPlatformAccessToken,
} from "../../modules/actions";

const PlatformForm = ({ selectedPlatform, platformHandler, type }) => {
  const tokenHandler = async (state, platform, win) => {
    console.log(state);
    switch (state) {
      case "NOT_REQUIRED":
        platformHandler(platform, type);
        win.close();
        return;
      case "REQUIRED_REFRESH_ACCESS_TOKEN":
        const response = await refreshPlatformAccessToken(platform);
        if (response.state) {
          platformHandler(platform, type);
        }
        win.close();
        return;
      case "REQUIRED_OAUTH":
        if (!win.closed) {
          await oauthHandler(platform, win);
        }
        return;
    }
  };

  const oauthHandler = async (platform, win) => {
    const currentURL =
      window.location.protocol + "//" + window.location.host + window.location.pathname;
    const url = authUri(platform, currentURL, "token");
    // const win = window.open(url, "", "width=400, height=700");
    win.location = url;
    const interval = setInterval(async () => {
      if (win.closed) {
        const response = await getPlatformToken(platform);
        tokenHandler(response.state, platform, win);
        clearInterval(interval);
      }
    }, [1000]);
  };

  const activeBtnHandler = (platform) => {
    return selectedPlatform[type] === platform || selectedPlatform["source"] === platform; //소스에 선택되었거나 대상에 선택되었으면 비활성화
  };

  const onPlatform = async (platform) => {
    const win = window.open("", "", "width=400, height=700");
    const response = await getPlatformToken(platform);
    await tokenHandler(response.state, platform, win);
  };

  const onUpload = (platform) => {
    platformHandler(platform, type);
  };

  return (
    <div>
      {type} : {selectedPlatform[type]}
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
