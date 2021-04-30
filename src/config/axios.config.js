import axios from "axios";

export default () => {
  console.log("axios");
  axios.defaults.withCredentials = true;
};
