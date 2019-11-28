import fs from "fs";
import e from "../err";
const chmod = (path: string, mode: number = 755) => {
  try {
    fs.chmodSync(path, mode);
  } catch (er) {
    throw e.err(er);
  }
  return "";
};

export default chmod;
