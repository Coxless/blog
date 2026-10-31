export type DemoWasm = {
  fib(n: number): bigint;
};

export async function instantiateDemoWasm(bytes: BufferSource): Promise<DemoWasm> {
  const { instance } = await WebAssembly.instantiate(bytes);
  return instance.exports as unknown as DemoWasm;
}

export async function loadDemoWasm(url = "/wasm/demo.wasm"): Promise<DemoWasm> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url} の取得に失敗しました (${response.status})`);
  return instantiateDemoWasm(await response.arrayBuffer());
}

/** WASM 側と比較するための同じアルゴリズム (再帰) の JS 実装 */
export function fibJs(n: number): number {
  return n < 2 ? n : fibJs(n - 1) + fibJs(n - 2);
}
