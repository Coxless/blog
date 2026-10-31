import { afterEach, describe, expect, it, jest } from "@jest/globals";
import fs from "node:fs";
import path from "node:path";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import WasmFib from "./WasmFib";

const originalFetch = globalThis.fetch;

function mockFetch(response: Partial<Response>) {
  globalThis.fetch = jest.fn<typeof fetch>().mockResolvedValue(response as Response);
}

afterEach(() => {
  cleanup();
  globalThis.fetch = originalFetch;
});

describe("WasmFib", () => {
  function mockWasmFile() {
    const file = fs.readFileSync(path.join(process.cwd(), "public/wasm/demo.wasm"));
    mockFetch({
      ok: true,
      arrayBuffer: async () => file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength),
    });
  }

  it("入力が空でも NaN にならず、範囲外の値は丸める", async () => {
    mockWasmFile();
    render(<WasmFib />);
    const button = await screen.findByRole("button", { name: "実行" });
    const input = screen.getByLabelText(/^n/) as HTMLInputElement;

    fireEvent.change(input, { target: { value: "" } });
    expect(input.value).toBe("");
    fireEvent.click(button);
    expect(screen.getByText("fib(0)")).toBeTruthy();

    fireEvent.change(input, { target: { value: "-5" } });
    fireEvent.click(button);
    expect(screen.getByText("fib(0)")).toBeTruthy();
  });

  it("WASM を読み込んで実行結果を表示する", async () => {
    mockWasmFile();
    render(<WasmFib />);

    const button = await screen.findByRole("button", { name: "実行" });
    fireEvent.change(screen.getByLabelText(/^n/), { target: { value: "10" } });
    fireEvent.click(button);

    expect(screen.getByText("fib(10)")).toBeTruthy();
    expect(screen.getByText("55")).toBeTruthy();
  });

  it("読み込みに失敗したらエラーを表示する", async () => {
    mockFetch({ ok: false, status: 404 });
    render(<WasmFib />);
    expect((await screen.findByRole("alert")).textContent).toContain("404");
  });
});
