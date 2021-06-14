import axios from "axios";

export default () => {
  axios.defaults.baseURL =
    process.env.NODE_ENV === "production" ? "/api" : "http://localhost:5000/api";
  axios.defaults.withCredentials = true;
};
