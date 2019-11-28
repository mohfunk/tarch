import chai from "chai";
import sh from "../../src/util/sh";
import p from "path";
import os from "os";
import e from "../../src/util/err";
import lg from "../../src/util/log";
import { mkdirOptions } from "../../src/util/fs/mkdir";
const err = e.err;

const expect = chai.expect;
describe("fs commands", function() {
  const init_dir = sh.pwd();
  this.beforeEach("Setup", () => {
    sh.cd(`${init_dir}/tests`);
  });
  describe("$ pwd", () => {
    it("# match the process directory", () => {
      expect(p.basename(sh.pwd())).to.equal("tests");
    });
  });
  describe("$ cd", () => {
    it("# cds into an existing directory", () => {
      sh.cd("./util");
      expect(p.basename(sh.pwd())).to.equal("util");
    });
    it("# cds into ~", () => {
      sh.cd();
      expect(sh.pwd()).to.equal(os.homedir());
    });
    it("# cds into prev directory", () => {
      sh.cd("./util");
      sh.cd("-");
      expect(p.basename(sh.pwd())).to.equal("tests");
    });
    it("# throws if dir doesnt exist", () => {
      expect(() => sh.cd("abc")).to.throw();
    });
  });
  describe("$ mkdir", () => {
    it("# creates a directory", () => {
      sh.mkdir("temp");
      sh.cd("./temp");
      expect(p.basename(sh.pwd())).to.equal("temp");
      sh.cd("../");
      sh.rmdir("./temp");
    });
    it("# throws if a file exists", () => {
      expect(() => sh.mkdir("main.test.ts")).to.throw();
    });
    it("# throws if a dir exists and no options", () =>
      expect(() => sh.mkdir("util")).to.throw());
    it("# creates directories recursively", () => {
      sh.mkdir("temp/a/b/c/", mkdirOptions.RECURSIVE);
      sh.mkdir("temp/a/b/d", mkdirOptions.RECURSIVE);
    });
  });
  describe("$ rmdir", () => {
    it("# removes the present working directory", () => {
      sh.mkdir("temp1");
      sh.cd("temp1");
      sh.rmdir();
      expect(p.basename(sh.pwd())).to.equal("tests");
    });
  });
});
