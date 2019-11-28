import Nightmare from "nightmare";
import NightConfig from "./nightConfig";
import lg from "../util/log";

export default class Night extends Nightmare {
  protected standardWait: number;

  constructor(config: any, stw: number = 500) {
    super(config);
    this.standardWait = stw;
    this.setAgent(
      "Mozilla/5.0 (Windows NT 6.3; WOW64; rv:63.0) Gecko/20100101 Firefox/63.0"
    );
  }
  setAgent = (agent: string) => this.useragent(agent);
  i = (selector: string, val: string): Night => {
    lg.info(`       NIGHT::INSERT [${val}]`);
    return this.wait(selector)
      .insert(selector, "")
      .insert(selector, val)
      .wait(this.standardWait) as Night;
  };

  s = (selector: string, val: string): Night => {
    lg.info(`        NIGHT::SELECT [${val}]`);
    return this.wait(selector)
      .wait(this.standardWait)
      .select(selector, val)
      .wait(this.standardWait) as Night;
  };
  b = (selector: string): Night => {
    lg.info(`       NIGHT::CLICK`);
    console.log(selector);
    return this.wait(selector)
      .wait(this.standardWait)
      .click(selector)
      .wait(this.standardWait)
      .wait(this.standardWait) as Night;
  };
  c = (selector: string): Night => {
    lg.info(`       NIGHT::CHECK`);
    return this.wait(selector)
      .wait(this.standardWait)
      .check(selector)
      .wait(this.standardWait) as Night;
  };
  un = (selector: string): Night => {
    lg.info(`       NIGHT::UNCLICK`);
    return this.wait(selector)
      .wait(this.standardWait)
      .uncheck(selector)
      .wait(this.standardWait) as Night;
  };
  go = (url: string): Night => {
    lg.info(`       NIGHT::GO [${url}]`);
    return this.wait(this.standardWait)
      .goto(url)
      .wait(this.standardWait) as Night;
  };
  scr = (y: number, x: number) => {
    lg.info(`       NIGHT::SCROLL`);
    return this.wait(300)
      .scrollTo(y, x)
      .wait(300) as Night;
  };
  loaded = (u: string): boolean | void => {
    if (this.url() === u) {
      return true;
    } else {
      this.wait().then(() => this.loaded(u));
    }
  };
  m_down = (selector: string): Night => {
    lg.info(`       NIGHT::MOUSE::DOWN`);
    return this.wait(this.standardWait)
      .wait(selector)
      .mousedown(selector)
      .wait(this.standardWait) as Night;
  };
  m_up = (selector: string): Night => {
    lg.info(`       NIGHT::MOUSE::UP`);
    return this.wait(this.standardWait)
      .wait(selector)
      .mouseup(selector)
      .wait(this.standardWait) as Night;
  };
  m_over = (selector: string): Night => {
    lg.info(`       NIGHT::MOUSE::OVER`);
    return this.wait(this.standardWait)
      .wait(selector)
      .mouseover(selector)
      .wait(this.standardWait) as Night;
  };
  fl = (): Night => {
    lg.info(`       NIGHT::COOKIES::FLUSH`);
    return this.cookies.flush() as Night;
  };
}
