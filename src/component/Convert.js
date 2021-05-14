import Cookies from "js-cookie";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Context } from "../context";
import { authUri, getPlatformToken, refreshAccessToken, uploadPlaylist } from "../modules/actions";
import {
  convertPlaylist,
  getPlaylistFromPlatform,
  getTrackFromPlatform,
} from "../modules/actions/convertActions";

const in30Minutes = 1 / 48;
const cookiePath = "/convert";
const confirmToken = (platform, callback) => {
  console.log(platform);
  getPlatformToken(platform).then((response) => {
    console.log("confirm", platform, response);
    callback(response);
  });
};

//source/destination 선택
const First = ({ data, setData, type }) => {
  /* 
  1. 마운트하면서 쿠키를 확인한다.
  1-1. 쿠키가 있으면 토큰이 존재하는지 확인한다.
  1-1-1. 토큰이 있으면 setData(source: cookie)로 한다.
  1-1-2. 토큰이 없으면 패스
  1-2. 쿠키가 없으면 패스
  
  2. source를 클릭하면 토큰을 확인한다.
  2-1. 토큰이 있으면 setData(source: cookie)로 한다.
  2-2. 토큰이 없으면 쿠키를 만들고 토큰을 가져온다. => 이 경우 새로고침이 된다.
  */
  const {
    state: { tokenPlatform },
    dispatch,
  } = useContext(Context);
  const [refresh, setRefresh] = useState();

  useEffect(() => {
    const cookie = Cookies.get(type);
    console.log("cookie", cookie);
    if (cookie || refresh) {
      confirmToken(cookie, setDataCallback(cookie));
    }
  }, [tokenPlatform, refresh]);

  const setDataCallback = (platform) => (state) => {
    if (state) {
      setData((prev) => {
        const obj = { ...prev, playlists: [], tracks: [] };
        obj[type] = platform;
        return obj;
      });
      if (type === "destination") {
        Cookies.remove("source", { path: cookiePath });
        Cookies.remove("destination", { path: cookiePath });
      }
    } else {
      setData(initialState);
    }
  };

  const getTokenCallback = (platform) => (state) => {
    Cookies.set(type, platform, { expires: in30Minutes, path: cookiePath });

    if (state === "NOT_REQUIRED") {
      setDataCallback(platform)(state);
    } else if (state === "REQUIRED_REFRESH_ACCESS_TOKEN") {
      refreshAccessToken(platform, dispatch).then(() => {
        setRefresh(platform);
      });
    } else if (state === "REQUIRED_OAUTH") {
      window.location = authUri(platform, "http://localhost:3000/convert", "token");
    }
  };

  const activeBtnHandler = (platform) => {
    return data[type] === platform || data["source"] === platform; //소스에 선택되었거나 대상에 선택되었으면 비활성화
  };

  const onClick = (value) => {
    confirmToken(value, getTokenCallback(value));
  };

  return (
    <div>
      {type} : {data[type]}
      <button disabled={activeBtnHandler("spotify")} onClick={() => onClick("spotify")}>
        spotify
      </button>
      <button disabled={activeBtnHandler("google")} onClick={() => onClick("google")}>
        google
      </button>
    </div>
  );
};

//플레이리스트 선택
const Second = ({ data, setData }) => {
  const [items, setItems] = useState([]);
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [isActivePlaylistBtn, setIsActivePlaylistBtn] = useState(true);
  const [isActiveTrackBtn, setIsActiveTrackBtn] = useState(false);
  const [playlists, setPlaylists] = useState(null);

  //source 변경 시 초기화
  useEffect(() => {
    setItems([]);
    setCheckedItems(new Set());
    setIsActivePlaylistBtn(true);
    setIsActiveTrackBtn(false);
  }, [data.source]);

  //playlist check box handler
  const checkedItemHandler = (id, isChecked) => {
    if (isChecked) {
      checkedItems.add(id);
      setCheckedItems(checkedItems);
    } else if (!isChecked && checkedItems.has(id)) {
      checkedItems.delete(id);
      setCheckedItems(checkedItems);
    }
    setIsActiveTrackBtn(checkedItems.size);
  };

  //platform에서 playlists(items) 가져오기
  const playlistHandler = useCallback(() => {
    getPlaylistFromPlatform(data.source).then((response) => {
      console.log(response);
      setItems(response.playlists);
    });

    setIsActivePlaylistBtn(false);
  });

  //선택된 checkedItems의 idx로 playlists 구분
  const trackHandler = useCallback(() => {
    const checkedPlaylists = [];
    checkedItems.forEach((idx) => {
      checkedPlaylists.push(items[idx]);
    });

    setData((prev) => {
      return { ...prev, playlists: checkedPlaylists, tracks: [] };
    });
    setIsActiveTrackBtn(false);
  });

  return (
    <div>
      <button
        className={isActivePlaylistBtn ? "activeBtn" : "unActiveBtn"}
        disabled={!isActivePlaylistBtn}
        onClick={playlistHandler}
      >
        플레이리스트 가져오기 / {data.source}
      </button>

      {items.map((p, idx) => (
        <Playlist
          key={p.platformId}
          playlist={p}
          idx={idx}
          checkedItems={checkedItems}
          checkedItemHandler={checkedItemHandler}
        />
      ))}

      {playlists}
      {!isActivePlaylistBtn ? (
        <button
          className={isActiveTrackBtn ? "activeBtn" : "unActiveBtn"}
          disabled={!isActiveTrackBtn}
          onClick={trackHandler}
        >
          다음단계
        </button>
      ) : null}
    </div>
  );

  /*
      변환하기 / 업로드하기 방법
      1. isActiveTrackBtn을 이용하여 다른 컴포넌트를 제어한다.
      2. 현재 컴포넌트(Second)에 메소드를 만든다.
      3. 현재 컴포넌트에 메소드를 넘겨준다.
   */
};

const Playlist = ({ playlist, idx, checkedItems, checkedItemHandler }) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={checkedItems.has(idx)}
        onChange={(e) => {
          checkedItemHandler(idx, e.target.checked);
        }}
      />
      <div>{playlist.title}</div>
    </div>
  );
};

//변환 / 업로드
const Third = ({ data, setData }) => {
  const [convertSucceedPlaylists, setConvertSucceedPlaylists] = useState([]);
  const [uploadSucceedPlaylists, setUploadSucceedPlaylists] = useState(false);

  useEffect(() => {
    getTrackFromPlatform(data.source, data.playlists).then(({ tracks }) => {
      setData((prev) => {
        return { ...prev, tracks };
      });
    });
  }, [data.playlists]);

  const convertHandler = () => {
    if (data.tracks.length) {
      convertPlaylist(data.destination, data.playlists, data.tracks).then(({ playlists }) => {
        setConvertSucceedPlaylists(playlists);
      });
    }
  };
  const uploadHandler = () => {
    if (data.tracks.length) {
      uploadPlaylist(data.playlists, data.tracks).then((response) => {
        setUploadSucceedPlaylists(response);
      });
    }
  };

  const goPlatformHandler = (platform, playlistId = undefined) => {
    let url;
    if (platform === "google") {
      url = `https://www.youtube.com/playlist?list=${playlistId}`;
    }
    if (platform === "spotify") {
      url = `https://open.spotify.com/playlist/${playlistId}`;
    }
    if (platform === "local") {
      url = `http://localhost:3000/playlist`;
    }

    window.open(url);
  };

  return (
    <div>
      {data.playlists.map((playlist, idx) => (
        <p>{playlist.title}</p>
      ))}
      <button onClick={convertHandler}>변환하기</button>
      <button onClick={uploadHandler}>업로드하기</button>
      {convertSucceedPlaylists.length !== 0 ? (
        <div>
          <div>변환 완료</div>
          {convertSucceedPlaylists.map((playlist) => (
            <button
              key={playlist.platformId}
              onClick={() => {
                goPlatformHandler(data.destination, playlist.platformId);
              }}
            >
              {playlist.title}
            </button>
          ))}
        </div>
      ) : null}
      {uploadSucceedPlaylists ? (
        <div>
          <div>업로드 완료</div>
          <button
            onClick={() => {
              goPlatformHandler("local");
            }}
          >
            이동하기
          </button>
        </div>
      ) : null}
    </div>
  );
};

const initialState = {
  source: "",
  destination: "",
  playlists: [],
  tracks: [],
  error: "",
};

export default function Convert() {
  const {
    state: { isLoggedIn },
  } = useContext(Context);
  const [data, setData] = useState(initialState);
  const { source, destination, playlists, error } = data;

  useEffect(() => {
    setData((prev) => {
      return { ...initialState, source: prev.source };
    });
  }, [source]);

  if (!isLoggedIn) {
    return (
      <div>
        <h1>로그인 필요</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>This is Convert / {}</h1>
      {error ? <h2>error: {error}</h2> : null}
      <First data={data} setData={setData} type={"source"} />
      {source ? <First data={data} setData={setData} type={"destination"} /> : null}
      {destination ? <Second data={data} setData={setData} /> : null}
      {playlists.length !== 0 ? <Third data={data} setData={setData} /> : null}
    </div>
  );
}
