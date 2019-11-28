import lg from "./log";

const errs = {
  fs: {
    cd: {
      prevDir: "fs.cd:Previous directory does not exist",
      noDir: "fs.cd:Directory does not exist"
    },
    mkdir: {
      perm: "fs.mkdir:Permission error",
      invInput: "fs.mkdir:Invalid input",
      invOpt: "invalid mkdir option",
      alreadyExists: "fs.mkdir:Path already exists",
      fileExists: "fs.mkdir:A file with the same name exists"
    },
    rmdir: {
      input: {
        file: "fs.rmdir:Input is a file",
        notDir: "fs.rmdir:Input is not a directory"
      },
      noDir: "fs.rmdir:Directory Does Not Exists",
      noPrev: "fs.rmdir:Previous directory doest exist"
    }
  }
};

const destruct = (msg: string): { name: string; message: string } => {
  let e = msg.split(":");
  return { name: e[0], message: e[1] };
};

const error = (msg: string): Error => {
  let e = destruct(msg);
  let er = new Error();
  er.message = e.message;
  er.name = e.name;
  lg.fail(er);
  return er;
};
const err = (e: Error | string): Error => {
  if (typeof e === "string") {
    return error(e);
  }
  lg.fail(e);
  return e;
};

const e = { err, errs };

export default e;
