import pwd from "./fs/pwd";
import mkdir from "./fs/mkdir";
import cd from "./fs/cd";
import chmod from "./fs/chmod";
import rmdir from "./fs/rmdir";

const sh = { pwd, mkdir, cd, chmod, rmdir };
export default sh;
