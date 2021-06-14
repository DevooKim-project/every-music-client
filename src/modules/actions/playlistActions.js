import axios from "axios";

//get A Playlist
export const getPlaylist = async (playlistId) => {
  const options = {
    method: "GET",
    url: `/playlist/${playlistId}`,
  };
  try {
    const response = await axios(options);
    console.log("getTrack", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//limit이 1미만이면 모든 도큐먼트를 요청한다.
//get list of Playlists
export const getPlaylists = async (page = 0, limit = 0, sort = undefined) => {
  const options = {
    method: "GET",
    url: `/playlist`,
    params: { page, limit, sort },
  };
  try {
    const response = await axios(options);
    console.log("getPlaylists", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPlaylistsByUser = async (userId, page = 0, limit = 0, sort = undefined) => {
  const options = {
    method: "GET",
    url: `/playlist/user/${userId}`,
    params: { page, limit, sort },
  };
  try {
    const response = await axios(options);
    console.log("getPlaylists", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const likePlaylist = async (playlistId, state) => {
  const options = {
    method: "PUT",
    url: `/playlist/like/${playlistId}/${state}`,
  };
  try {
    const response = await axios(options); //NO_CONTENT
    console.log("likePlaylist");
    return;
  } catch (error) {
    console.log(error);
  }
};

export const updatePlaylistOptions = async (playlist) => {
  const options = {
    method: "PUT",
    url: `/playlist/${playlist.id}`,
    data: { ...playlist },
  };
  try {
    const response = await axios(options);
    console.log("updatePlaylistOptions", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const uploadPlaylist = async (playlists, tracks) => {
  const options = {
    method: "POST",
    url: `/playlist/upload`,
    data: { playlists, tracks },
  };

  try {
    const response = await axios(options);
    console.log("uploadPlaylist", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deletePlaylist = async (playlistId) => {
  const options = {
    method: "DELETE",
    url: `/playlist/${playlistId}`,
  };

  try {
    await axios(options);
    return;
  } catch (error) {
    console.log(error);
  }
};
