import axios from "axios";

export default () => {
  console.log("axios");
  axios.defaults.baseURL = "http://localhost:5000";
  axios.defaults.withCredentials = true;
};
