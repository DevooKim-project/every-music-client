import qs from "qs";

const GoogleAuthParams = (redirectUri, type) => {
  const url = "https://accounts.google.com/o/oauth2/v2/auth";
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/youtube.readonly",
    "https://www.googleapis.com/auth/youtube.upload",
    "https://www.googleapis.com/auth/youtube.force-ssl",
    "https://www.googleapis.com/auth/youtube",
  ];

  const params = {
    client_id: process.env.REACT_APP_GOOGLE_ID,
    redirect_uri: `${redirectUri}/?platform=google&type=${type}`,
    response_type: "code",
    access_type: "offline",
    scope: scopes.join(" "),
  };

  const oAuthUri = `${url}?${qs.stringify(params)}`;
  return oAuthUri;
};

const SpotifyAuthParams = (redirectUri, type) => {
  const url = "https://accounts.spotify.com/authorize";
  const scopes = [
    "user-read-email",
    "playlist-modify-public",
    "playlist-modify-private",
    "playlist-read-private",
  ];

  const params = {
    response_type: "code",
    client_id: process.env.REACT_APP_SPOTIFY_ID,
    redirect_uri: `${redirectUri}/?platform=spotify&type=${type}`,
    scope: scopes.join(" "),
  };

  const oAuthUri = `${url}?${qs.stringify(params)}`;
  return oAuthUri;
};

const KakaoAuthParams = (redirectUri, type) => {
  const url = "https://kauth.kakao.com/oauth/authorize";
  const scopes = ["account_email", "profile"];

  const params = {
    client_id: process.env.REACT_APP_KAKAO_ID,
    redirect_uri: `${redirectUri}/?platform=kakao&type=${type}`,
    response_type: "code",
    scope: scopes.join(","),
    // state: "", //CSRF 공격 보호를 위한 임의의 문자열
  };

  const oAuthUri = `${url}?${qs.stringify(params)}`;
  return oAuthUri;
};

export const authUri = (platform, redirectUri, type) => {
  type = type.toLowerCase();
  switch (platform) {
    case "google":
      return GoogleAuthParams(redirectUri, type);
    case "spotify":
      return SpotifyAuthParams(redirectUri, type);
    case "kakao":
      return KakaoAuthParams(redirectUri, type);

    default:
      return "ERROR";
  }
};
