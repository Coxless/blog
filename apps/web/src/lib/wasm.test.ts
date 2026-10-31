/** @vitest-environment node */
import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fibJs, instantiateDemoWasm } from "./wasm";

const bytes = fs.readFileSync(path.join(process.cwd(), "public/wasm/demo.wasm"));

describe("public/wasm/demo.wasm", () => {
  it.each([
    [0, 0n],
    [1, 1n],
    [10, 55n],
    [30, 832040n],
  ])("fib(%i) = %s", async (n, expected) => {
    const wasm = await instantiateDemoWasm(bytes);
    expect(wasm.fib(n)).toBe(expected);
  });

  it("JavaScript 実装と同じ結果を返す", async () => {
    const wasm = await instantiateDemoWasm(bytes);
    for (let n = 0; n <= 25; n++) {
      expect(Number(wasm.fib(n))).toBe(fibJs(n));
    }
  });
});
