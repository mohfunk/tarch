import pwd from "./fs/pwd";
import mkdir from "./fs/mkdir";
import cd from "./fs/cd";
import chmod from "./fs/chmod";
import rmdir from "./fs/rmdir";
import exists from "./fs/exists";

const sh = { pwd, mkdir, cd, chmod, rmdir, exists };
export default sh;
