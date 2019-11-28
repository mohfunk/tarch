import p from "path";
import fs from "fs";
import e from "../err";
let errs = e.errs.fs.mkdir;
let err = e.err;
export enum mkdirOptions {
  NONE = 0,
  RECURSIVE = 1
}

const _mkdirRec = (dir: string) => {
  const baseDir = p.dirname(dir);
  if (baseDir === dir) {
    throw err(errs.perm);
  }
  if (fs.existsSync(baseDir)) {
    fs.mkdirSync(dir, parseInt("0777", 8));
    return;
  }
  _mkdirRec(baseDir);
  fs.mkdirSync(dir, parseInt("0777", 8));
};

const mkdir = (
  dirs: string[] | string,
  opt: mkdirOptions = mkdirOptions.NONE
) => {
  if (!dirs) {
    throw err(errs.invInput);
  }
  if (typeof dirs === "string") {
    const str: string = dirs;
    dirs = new Array<string>(1);
    dirs[0] = str;
  }
  dirs.forEach((d: string) => {
    try {
      let stat = fs.lstatSync(d);
      switch (opt) {
        case mkdirOptions.NONE:
          throw err(errs.alreadyExists);
        case mkdirOptions.RECURSIVE:
          if (stat.isFile()) throw err(errs.fileExists);
        default:
          throw err(errs.invOpt);
      }
    } catch (e) {}

    let baseDir = p.dirname(d);
    if (!fs.existsSync(baseDir) && !(opt === mkdirOptions.RECURSIVE)) {
      throw err(errs.invInput);
    }
    try {
      switch (opt) {
        case mkdirOptions.NONE: {
          fs.mkdirSync(d, parseInt("0777", 8));
          break;
        }
        case mkdirOptions.RECURSIVE: {
          _mkdirRec(p.resolve(d));
          break;
        }
        default:
          throw err(errs.invOpt);
      }
    } catch (e) {
      if (e) throw err(e);
    }
  });
  return "";
};

export default mkdir;
