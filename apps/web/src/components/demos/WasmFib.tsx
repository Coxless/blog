"use client";

import { useEffect, useState } from "react";
import { fibJs, loadDemoWasm, type DemoWasm } from "#/lib/wasm";

type Result = { n: number; value: string; wasmMs: number; jsMs: number };

const MAX_N = 40;

function timed<T>(fn: () => T): [T, number] {
  const start = performance.now();
  const value = fn();
  return [value, performance.now() - start];
}

export default function WasmFib() {
  const [wasm, setWasm] = useState<DemoWasm | null>(null);
  const [error, setError] = useState<string | null>(null);
  // 入力途中の空欄を保てるよう、文字列のまま持つ
  const [n, setN] = useState("35");
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    loadDemoWasm()
      .then(setWasm)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : String(e)));
  }, []);

  function run() {
    if (!wasm) return;
    const target = Math.min(Math.max(Math.trunc(Number(n)) || 0, 0), MAX_N);
    const [value, wasmMs] = timed(() => wasm.fib(target));
    const [, jsMs] = timed(() => fibJs(target));
    setResult({ n: target, value: value.toString(), wasmMs, jsMs });
  }

  return (
    <div className="not-prose border border-border rounded-lg p-6 bg-card space-y-4">
      {error ? (
        <p role="alert" className="text-destructive">
          WASMを読み込めませんでした: {error}
        </p>
      ) : (
        <>
          <div className="flex items-center gap-3 flex-wrap">
            <label htmlFor="wasm-fib-n">n (最大{MAX_N})</label>
            <input
              id="wasm-fib-n"
              type="number"
              min={0}
              max={MAX_N}
              value={n}
              onChange={(event) => setN(event.target.value)}
              className="w-24 border border-border rounded-md px-3 py-1 bg-background"
            />
            <button
              type="button"
              onClick={run}
              disabled={!wasm}
              className="px-4 py-1 rounded-lg bg-primary text-primary-foreground disabled:opacity-50"
            >
              {wasm ? "実行" : "読み込み中…"}
            </button>
          </div>
          {result && (
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
              <dt className="text-muted-foreground">fib({result.n})</dt>
              <dd>{result.value}</dd>
              <dt className="text-muted-foreground">WASM (Rust)</dt>
              <dd>{result.wasmMs.toFixed(1)} ms</dd>
              <dt className="text-muted-foreground">JavaScript</dt>
              <dd>{result.jsMs.toFixed(1)} ms</dd>
            </dl>
          )}
        </>
      )}
    </div>
  );
}
