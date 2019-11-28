import chai from "chai";
import sh from "../../src/util/sh";
import p from "path";
import os from "os";
import e from "../../src/util/err";
import lg from "../../src/util/log";
const err = e.err;

const expect = chai.expect;
describe("fs commands", function() {
  describe("$ pwd", () => {
    it("# match the process directory", () => {
      lg.warn(sh.pwd());
      expect(p.basename(sh.pwd())).to.equal("tarch");
    });
  });
});
