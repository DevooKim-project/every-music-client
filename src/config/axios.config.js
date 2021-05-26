import axios from "axios";

export default () => {
  console.log("axios");
  axios.defaults.baseURL = "http://localhost:5000/api";
  // axios.defaults.baseURL = "/api";
  axios.defaults.withCredentials = true;
};
