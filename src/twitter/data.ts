const URLS = {
  home: "https://twitter.com/",
  login: "https://twitter.com/login/"
};

const MSG = {
  PROCES: {
    IN: { ID: 100, msg: "PROCES_INIT" },
    DN: { ID: 101, msg: "PROCES_DONE" },
    AF: { ID: 102, msg: "PROCES_FAIL" }
  },
  LOGIN: {
    ST: { ID: 110, msg: "LOGIN_INIT" },
    PA: { ID: 111, msg: "LOGIN_PASS" },
    FA: { ID: 112, mdg: "LOGIN_FAIL" }
  },
  VERIF: {
    ST: { ID: 120, msg: "VERIF_INIT" },
    PA: { ID: 121, msg: "VERIF_PASS" },
    FA: { ID: 122, msg: "VERIF_FAIL" },
    EV: { ID: 123, msg: "VERIF_MAIL" },
    PV: { ID: 124, msg: "VERIF_PHON" }
  }
};

const SELECTORS = {
  i: {
    login: {
      username:
        "#page-container > div > div.signin-wrapper > form > fieldset > div:nth-child(2) > input",
      password:
        "#page-container > div > div.signin-wrapper > form > fieldset > div:nth-child(3) > input",
      authpass: "#auth_password",
      challnge: "#challenge_response",
      login_ch: "login_challenge"
    }
  },
  b: {
    login: {
      log:
        "#page-container > div > div.signin-wrapper > form > div.clearfix > button",
      submitch: "#email_challenge_submit"
    }
  }
};

const DATA = {
  url: URLS,
  msg: MSG,
  sel: SELECTORS
};
export default DATA;
