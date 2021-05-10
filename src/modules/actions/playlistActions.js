import axios from "axios";

export const getPlaylistBoard = async (page = 0, limit = 10) => {
  const options = {
    method: "GET",
    url: `/playlist?page=${page}&limit=${limit}`,
  };
  try {
    const response = await axios(options);
    console.log("getPlaylistBoard", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPlaylistBoardByUser = async (userId, page = 0, limit = 10) => {
  const options = {
    method: "GET",
    url: `/playlist/${userId}?page=${page}&limit=${limit}`,
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