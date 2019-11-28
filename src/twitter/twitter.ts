import Night from "../night/night";
import Config from "../night/nightConfig";

import xPathToCss from "../util/xpaths";
import { exturl } from "../util/url";
import msg from "../util/msg";
import lg from "../util/log";
import DATA from "./data";

const ts = DATA.sel;
const url = DATA.url;
const M = DATA.msg;
const i = ts.i;
const b = ts.b;

export default class Twitter extends Night {
  private readonly _log: any;
  private readonly _msg: msg;
  get msg(): msg {
    return this._msg;
  }
  constructor(config: any, data: any) {
    super(config, 500);
    this._msg = new msg(M.PROCES.IN.ID);
    this._log = {
      username: data.profile,
      password: data.pass,
      email: data.email,
      phone: data.phone
    };
  }
  private _url: string = url.home;
  private _base: string = url.home;
  private sel = (selector: string): string => xPathToCss(selector);
  private chq = (id: number): Twitter =>
    this._msg.id() === id ? this.step() : this.reset(id, 2);
  private to(dir: string): string {
    this._url = this._base + dir;
    return this._url;
  }
  private reset = (id: number, max: number = 0): Twitter => {
    this._msg.reset(id, max);
    return this;
  };

  private step = (): Twitter => {
    this._msg.step();
    return this;
  };
  private succ = (): Twitter => {
    this._msg.succ();
    return this;
  };
  private fail = (): Twitter => {
    this._msg.fail();
    return this;
  };
  private dir = async (ur: string) => {
    if (ur === url.home) {
      await this.succ().loop();
      return;
    }
    if (exturl(ur, "login_challenge")) {
      await this.chq(M.VERIF.ST.ID).loop();
      return;
    }
  };
  private loop = async () => {
    if (this._msg.state() === 0) {
      if (this._msg.id() === M.VERIF.ST.ID) {
        await this.verify();
        return;
      }
    } else if (this._msg.state() === 1) {
      lg.pass(`     TWITTER::LOGIN PASS`);
      return;
    } else {
      lg.fail(`     TWITTER::LOGIN FAILD`);
      return;
    }
    return;
  };
  private async _login(): Promise<string> {
    return await this.i(i.login.username, this._log.username)
      .i(i.login.password, this._log.password)
      .b(b.login.log)
      .url();
  }
  private async _verify(vi: string): Promise<string> {
    return await this.i(i.login.challnge, vi)
      .b(b.login.submitch)
      .url();
  }
  private async verify() {
    const count = this._msg.count();
    lg.info(`   TWITTER::VERIFICATION::ATTEMPT [${count}]`);
    const ur = await this._verify(
      count === 0 ? this._log.phone : this._log.email
    );
    return this.dir(ur);
  }
  private async login() {
    const count = this._msg.count();
    lg.info(`   TWITTER::LOGIN::ATTEMPT [${count}]`);
    const ur = await this._login();
    return this.dir(ur);
  }

  /**
   * kills Twitter Instance
   * @returns
   * @memberof Twitter
   */
  stop = () => this.end();
  /**
   * starts Twitter Instance
   * @returns
   * @memberof Twitter
   */
  start = async () => {
    lg.info(`   TWITTER::INIT`);
    await this.go(url.login);
    this._msg.reset(M.LOGIN.ST.ID, 1);
    return await this.login();
  };
}
