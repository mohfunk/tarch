import chai from "chai";
import sh from "../../src/util/sh";
import p from "path";
import os from "os";
import e from "../../src/util/err";
import lg from "../../src/util/log";
const err = e.err;

const expect = chai.expect;
describe("fs commands", function() {
  const init_dir = sh.pwd();
  this.beforeEach("Setup", () => {
    sh.cd(`${init_dir}/tests`);
    lg.pass(`       before : ${sh.pwd()}`);
  });
  this.afterEach("after", () => {
    lg.warn(`       after : ${sh.pwd()}`);
  });
  describe("$ pwd", () => {
    it("# match the process directory", () => {
      expect(p.basename(sh.pwd())).to.equal("tests");
    });
  });
  describe("$ cd", () => {
    it("# cds into an existing directory", () => {
      lg.info(`           before cd : ${sh.pwd()}`);
      sh.cd("./util");
      lg.info(`           after  cd : ${sh.pwd()}`);
      expect(p.basename(sh.pwd())).to.equal("util");
    });
    it("# cds into ~", () => {
      lg.info(`           before cd : ${sh.pwd()}`);
      sh.cd();
      lg.info(`           after  cd : ${sh.pwd()}`);
      expect(sh.pwd()).to.equal(os.homedir());
    });
    it("# cds into prev directory", () => {
      lg.info(`           before cd : ${sh.pwd()}`);
      sh.cd("./util");
      lg.info(`           after  cd : ${sh.pwd()}`);
      sh.cd("-");
      lg.info(`           after  cd : ${sh.pwd()}`);
      expect(p.basename(sh.pwd())).to.equal("tests");
    });
    it("# throws if dir doesnt exist", () => {
      expect(() => sh.cd("abc")).to.throw();
    });
  });
  describe("$ mkdir", () => {
    it("# creates a directory", () => {
      sh.mkdir("temp");

      lg.info(`           before cd : ${sh.pwd()}`);
      sh.cd("./temp");
      lg.info(`           after  cd : ${sh.pwd()}`);
      expect(p.basename(sh.pwd())).to.equal("temp");

      lg.info(`           before cd : ${sh.pwd()}`);
      sh.cd("../");
      lg.info(`           after  cd : ${sh.pwd()}`);
      sh.rmdir("./temp");
    });
    it("# throws if a file exists", () => {
      expect(() => sh.mkdir("main.test.ts")).to.throw();
    });
    it("# throws if a dir exists and no options", () =>
      expect(() => sh.mkdir("util")).to.throw());
  });
  describe("$ rmdir", () => {
    it("# removes the present working directory", () => {
      sh.mkdir("temp1");
      lg.info(`           before cd : ${sh.pwd()}`);
      sh.cd("temp1");
      lg.info(`           after  cd : ${sh.pwd()}`);
      sh.rmdir();
      expect(p.basename(sh.pwd())).to.equal("tests");
    });
  });
});
