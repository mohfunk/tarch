import fs from "fs";
import p from "path";
import e from "../err";
let errs = e.errs.fs.rmdir;
let err = e.err;
const rmdir = (dir: string = process.cwd()) => {
  if (dir === process.cwd()) {
    try {
      process.chdir(p.dirname(p.resolve(dir)));
    } catch (e) {
      throw err(e);
    }
  }

  if (dir === "-") {
    if (!process.env.OLDPWD) {
      throw err(errs.noPrev);
    } else {
      dir = process.env.OLDPWD;
    }
  }
  if (!fs.existsSync(dir)) throw err(errs.noDir);
  var stat = fs.lstatSync(dir);
  if (!stat.isDirectory) throw err(errs.input.notDir);

  fs.rmdirSync(p.resolve(dir));
};

export default rmdir;
