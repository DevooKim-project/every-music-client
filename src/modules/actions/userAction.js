import axios from "axios";

export const getLibrary = async (playlistId = null) => {
  const options = {
    method: "GET",
    url: playlistId ? `/user/library/${playlistId}` : `/user/library`,
  };
  const response = await axios(options);
  console.log("getLibrary", response.data);
  return response.data;
};
