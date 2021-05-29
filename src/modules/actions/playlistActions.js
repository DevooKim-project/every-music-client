import axios from "axios";

//limit이 1미만이면 모든 도큐먼트를 요청한다.
export const getPlaylistBoard = async (page = 0, limit = 0) => {
  const options = {
    method: "GET",
    url: `/playlist`,
    params: { page, limit },
  };
  try {
    const response = await axios(options);
    console.log("getPlaylistBoard", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//limit이 1미만이면 모든 도큐먼트를 요청한다.
export const getPlaylistBoardByUser = async (userId, page = 0, limit = 0) => {
  const options = {
    method: "GET",
    url: `/playlist/${userId}`,
    params: { page, limit },
  };
  try {
    const response = await axios(options);
    console.log("getPlaylistBoardByUser: ", response.data);
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
