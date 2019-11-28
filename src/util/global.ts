import os from "os";
const _appData = [`${os.homedir}`, `tarch`, `data`, `session`];

const _jsonFiles = ["nightConfig.json", "profile.json"];
const appData = {
  dir: _appData.slice(0, 2).join("/"),
  data: _appData.slice(0, 3).join("/"),
  sess: `${_appData.slice(0, 4).join("/")}`,
  config: _appData
    .slice(0, 2)
    .concat(_jsonFiles[0])
    .join("/"),
  profile: _appData
    .slice(0, 2)
    .concat(_jsonFiles[1])
    .join("/")
};

export default appData;
