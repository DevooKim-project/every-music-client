import React, { useState } from "react";
import { getPlaylistFromPlatform } from "../../modules/actions";
import useAsync from "../../modules/useAsync";

const Form = ({ playlist, idx, checkedItems, checkedItemHandler }) => {
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

const PlaylistForm = ({ source, playlistHandler }) => {
  const fetchPlaylist = () => {
    return getPlaylistFromPlatform(source);
  };
  const [isActiveTrackBtn, setIsActiveTrackBtn] = useState(false);
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [playlistState, refetchPlaylist] = useAsync(fetchPlaylist, [], true);
  const { loading, data: playlistData, error } = playlistState;

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

  const checkedItemToPlaylist = () => {
    const checkedPlaylists = [];
    checkedItems.forEach((idx) => {
      checkedPlaylists.push(playlistData.playlists[idx]);
    });
    playlistHandler(checkedPlaylists);
    setIsActiveTrackBtn(false);
  };

  if (loading) return <div>로딩중</div>;
  if (error) return <div>에러발생</div>;
  if (!playlistData)
    return <button onClick={refetchPlaylist}>플레이리스트 가져오기 / {source}</button>;

  return (
    <div>
      {playlistData.playlists.map((playlist, idx) => (
        <Form
          key={playlist.platformId}
          playlist={playlist}
          idx={idx}
          checkedItems={checkedItems}
          checkedItemHandler={checkedItemHandler}
        />
      ))}

      <button
        className={isActiveTrackBtn ? "activeBtn" : "unActiveBtn"}
        disabled={!isActiveTrackBtn}
        onClick={checkedItemToPlaylist}
      >
        다음단계
      </button>
    </div>
  );
};

export default PlaylistForm;
