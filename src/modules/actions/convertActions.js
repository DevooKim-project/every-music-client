import axios from "axios";

export const getPlaylistFromPlatform = async (platform) => {
  const options = {
    method: "GET",
    url: `/convert/${platform}/playlists`,
  };

  try {
    const response = await axios(options);
    console.log("getPlaylistFromPlatform", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTrackFromPlatform = async (platform, playlists) => {
  const options = {
    method: "POST",
    url: `/convert/${platform}/tracks`,
    data: { playlists },
  };
  try {
    const response = await axios(options);
    console.log("getTrackFromPlatform", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const convertPlaylist = async (platform, playlists, tracks) => {
  const options = {
    method: "POST",
    url: `/convert/${platform}/playlists`,
    data: { playlists, tracks },
  };

  try {
    const response = await axios(options);
    console.log("convertPlaylist", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
