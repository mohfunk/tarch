import chai from "chai";
import sh from "../../src/util/sh";
import p from "path";
import os from "os";
import e from "../../src/util/err";
const err = e.err;

const expect = chai.expect;
describe("fs commands", function() {
  describe("$ pwd", () => {
    it("# match the process directory", () => {
      expect(p.basename(sh.pwd())).to.equal("tarch");
    });
  });
  describe("$ cd", () => {
    it("# throws if prev directory doesnt exist", () => {
      expect(() => sh.cd("-")).to.throw();
    });
    it("# cds into an existing directory", () => {
      sh.cd("tests");
      expect(p.basename(sh.pwd())).to.equal("tests");
      sh.cd("../");
    });
    it("# cds into ~", () => {
      var pwd = sh.pwd();
      sh.cd();
      expect(sh.pwd()).to.equal(os.homedir());
      sh.cd(pwd);
    });
    it("# cds into prev directory", () => {
      sh.cd("tests");
      sh.cd("-");
      expect(p.basename(sh.pwd())).to.equal("tarch");
    });
    it("# throws if dir doesnt exist", () => {
      expect(() => sh.cd("abc")).to.throw();
    });
  });
  describe("$ mkdir", () => {
    it("# creates a directory", () => {
      sh.cd("tests");
      sh.mkdir("temp");
      sh.cd("temp");
      expect(p.basename(sh.pwd())).to.equal("temp");
      sh.cd("../");
      sh.rmdir("temp");
      sh.cd("../");
    });
    it("# throws if a file exists", () => {
      sh.cd("tests");
      expect(() => sh.mkdir("main.test.ts")).to.throw();
      sh.cd("../");
    });
    it("# throws if a dir exists and no options", () => {
      sh.cd("tests");
      expect(() => sh.mkdir("util")).to.throw();
      sh.cd("../");
    });
  });
  describe("$ rmdir", () => {
    it("# removes the present working directory", () => {
      sh.cd("tests");
      sh.mkdir("temp1");
      sh.cd("temp1");
      sh.rmdir();
      expect(p.basename(sh.pwd())).to.equal("tests");
    });
  });
});
