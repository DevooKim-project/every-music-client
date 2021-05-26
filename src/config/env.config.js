import dotenv from "dotenv";
import path from "path";

export default () => {
  if (process.env.NODE_ENV === "development") {
    dotenv.config({ path: path.join(__dirname, "../../.env.development") });
  } else if (process.env.NODE_ENV === "development") {
    dotenv.config({ path: path.join(__dirname, "../../.env.production") });
  } else {
  }
};
