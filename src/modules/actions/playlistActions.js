import axios from "axios";

//get A Playlist
export const getPlaylist = async (playlistId) => {
  const options = {
    method: "GET",
    url: `/playlist/${playlistId}`,
  };

  const response = await axios(options);
  return response.data;
};

//limit이 1미만이면 모든 도큐먼트를 요청한다.
//get list of Playlists
export const getPlaylists = async (page = 0, limit = 0, sort = undefined) => {
  const options = {
    method: "GET",
    url: `/playlist`,
    params: { page, limit, sort },
  };

  const response = await axios(options);

  return response.data;
};

export const getPlaylistsByUser = async (userId, page = 0, limit = 0, sort = undefined) => {
  const options = {
    method: "GET",
    url: `/playlist/user/${userId}`,
    params: { page, limit, sort },
  };

  const response = await axios(options);

  return response.data;
};

export const likePlaylist = async (playlistId, state) => {
  const options = {
    method: "PUT",
    url: `/playlist/like/${playlistId}/${state}`,
  };

  await axios(options); //NO_CONTENT
  return;
};

export const updatePlaylistOptions = async (playlist) => {
  const options = {
    method: "PUT",
    url: `/playlist/${playlist.id}`,
    data: { ...playlist },
  };

  const response = await axios(options);

  return response.data;
};

export const uploadPlaylist = async (playlists, tracks) => {
  const options = {
    method: "POST",
    url: `/playlist/upload`,
    data: { playlists, tracks },
  };

  const response = await axios(options);

  return response.data;
};

export const deletePlaylist = async (playlistId) => {
  const options = {
    method: "DELETE",
    url: `/playlist/${playlistId}`,
  };

  await axios(options);
  return;
};
