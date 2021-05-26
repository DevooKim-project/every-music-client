import React from "react";
import { authUri, getPlatformToken, refreshPlatformAccessToken } from "../../modules/actions";

const PlatformForm = ({ selectedPlatform, platformHandler, type }) => {
  const tokenHandler = async (state, platform) => {
    console.log(state);
    switch (state) {
      case "NOT_REQUIRED":
        platformHandler(platform, type);
        return;
      case "REQUIRED_REFRESH_ACCESS_TOKEN":
        const response = await refreshPlatformAccessToken(platform);
        if (response.state) {
          platformHandler(platform, type);
        }
        return;
      case "REQUIRED_OAUTH":
        oauthHandler(platform);
        return;
    }
  };

  const oauthHandler = async (platform) => {
    // const url = authUri(platform, "http://localhost:3000/convert", "token");
    // const win = window.open(url, "", "width=400, height=400");
    const win = window.open();
    const urlPromise = new Promise((resolve, reject) => {
      const url = authUri(platform, "http://localhost:3000/convert", "token");
      console.log(win);
      resolve(url);
    });

    urlPromise.then((url) => {
      console.log("test", win);
      win.location = url;
    });

    const interval = setInterval(async () => {
      if (win.closed) {
        const response = await getPlatformToken(platform);
        tokenHandler(response.state, platform);
        clearInterval(interval);
      }
    }, [1000]);
  };

  const activeBtnHandler = (platform) => {
    return selectedPlatform[type] === platform || selectedPlatform["source"] === platform; //소스에 선택되었거나 대상에 선택되었으면 비활성화
  };

  const onPlatform = async (platform) => {
    const response = await getPlatformToken(platform);
    await tokenHandler(response.state, platform);
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
