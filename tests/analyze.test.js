import test from "node:test";
import assert from "node:assert/strict";
import { analyzeScripts } from "../src/cli.js";

test("finds dependencies and missing targets", () => {
  const result = analyzeScripts({ build: "npm run clean", clean: "echo ok", test: "npm run absent" });
  assert.deepEqual(result.graph.build, ["clean"]);
  assert.deepEqual(result.missing, [{ from: "test", target: "absent" }]);
});
test("detects dependency cycles", () => {
  const result = analyzeScripts({ a: "npm run b", b: "npm run a" });
  assert.equal(result.cycles.length, 1);
});
