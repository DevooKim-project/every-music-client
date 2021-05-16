import axios from "axios";

// export const getTracks = (playlistId) => async () => {
export const getTracks = async (playlistId) => {
  const options = {
    method: "GET",
    url: `/track/${playlistId}`,
  };
  try {
    const response = await axios(options);
    console.log("getTrack", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
