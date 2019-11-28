import { expect } from "chai";
import * as fs from "../src/util/fs";

describe("test", function() {
  it("1", () => {
    fs.mkdir("data");
    expect(1).to.equal(1);
  });
});
