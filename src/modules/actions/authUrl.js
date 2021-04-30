import qs from "qs";

const GoogleAuthParams = () => {
  const url = "https://accounts.google.com/o/oauth2/v2/auth";
  const redirectUri = "http://localhost:3000/?platform=google";
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
    redirect_uri: redirectUri,
    response_type: "code",
    scope: scopes.join(" "),
  };

  const oAuthUri = `${url}?${qs.stringify(params)}`;
  return oAuthUri;
};

const SpotifyAuthParams = () => {
  const scopes = ["user-read-email", "playlist-modify-public", "playlist-modify-private", "playlist-read-private"];
  const redirectUri = "http://localhost:3000/?platform=spotify";

  const url = "https://accounts.spotify.com/authorize";

  const params = {
    response_type: "code",
    client_id: process.env.REACT_APP_SPOTIFY_ID,
    redirect_uri: redirectUri,
    scope: scopes.join(" "),
  };

  const oAuthUri = `${url}?${qs.stringify(params)}`;
  return oAuthUri;
};

const KakaoAuthParams = () => {
  const scopes = ["account_email", "profile"];
  const redirectUri = "http://localhost:3000/?platform=kakao";

  const url = "https://kauth.kakao.com/oauth/authorize";

  const params = {
    client_id: process.env.REACT_APP_KAKAO_ID,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: scopes.join(","),
    // state: "", //CSRF 공격 보호를 위한 임의의 문자열
  };

  const oAuthUri = `${url}?${qs.stringify(params)}`;
  return oAuthUri;
};

export const authUri = (platform) => {
  switch (platform) {
    case "google":
      return GoogleAuthParams();
    case "spotify":
      return SpotifyAuthParams();
    case "kakao":
      return KakaoAuthParams();

    default:
      return "ERROR";
  }
};
