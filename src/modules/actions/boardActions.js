import axios from "axios";

export const getPlaylistBoard = async (page = 0, limit = 10) => {
  const options = {
    method: "GET",
    url: "/playlist",
    data: { page, limit },
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
    url: `/playlist/${userId}`,
    data: { page, limit },
  };
  try {
    const response = await axios(options);
    console.log("getPlaylistBoardByUser: ", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
