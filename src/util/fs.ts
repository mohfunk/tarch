import sh from "shelljs";

export const rm = async (file: string) => sh.rm("-f", file);
export const mv = async (ppath: string, npath: string) => sh.mv(ppath, npath);
export const mkdir = async (path: string) => sh.mkdir("-p", path);
export const rmdir = async (path: string) =>
  sh.ls(path).length === 0 ? sh.rm("-rf", path) : 0;
