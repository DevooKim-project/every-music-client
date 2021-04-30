import axios from "./axios.config";
import env from "./env.config";
export default () => {
  env();
  axios();
};
