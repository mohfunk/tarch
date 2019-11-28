import fs from "fs";

const exists = (path: string): boolean => fs.existsSync(path);
export default exists;
