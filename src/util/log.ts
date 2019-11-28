import chalk from "chalk";

const LOG = console.log;
const ERR = console.error;
const INF = console.info;
const TBL = console.table;
const WRN = console.warn;
let timerToggle = 0;
const checkTimer = () =>
  timerToggle === 0 ? (timerToggle += 1) : (timerToggle -= 1);

const time = (message: string) => {
  const t = timerToggle;
  checkTimer();
  if (t === 0) {
    INF(chalk.bold.gray(`${message} Timer Ticking`));
    console.time(message);
  } else {
    console.timeEnd(message);
  }
};
const fail = (obj: any) => ERR(chalk.bold.red(obj));
const pass = (obj: any) => LOG(chalk.bold.green(obj));
const info = (obj: any) => INF(chalk.bold.gray(obj));
const warn = (obj: any) => WRN(chalk.bold.yellow(obj));
const tble = (obj: any) => TBL(chalk.bold.white(obj));

const lg = { fail, pass, info, warn, tble, time };
export default lg;
