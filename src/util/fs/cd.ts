import os from "os";
import e from "../err";
import fs from "fs";
let errs = e.errs.fs.cd;
let err = e.err;
const cd = (dir: string = "") => {
  if (!dir) dir = os.homedir();
  if (dir === "-") {
    if (!process.env.OLDPWD) {
      throw err(errs.prevDir);
    } else {
      dir = process.env.OLDPWD;
    }
  }
  if (!fs.existsSync(dir)) {
    throw err(errs.noDir);
  }

  try {
    var curDir = process.cwd();
    process.chdir(dir);
    process.env.OLDPWD = curDir;
  } catch (e) {
    throw err(e);
  }
  return "";
};
export default cd;
