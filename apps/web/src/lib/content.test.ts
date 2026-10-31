/** @jest-environment node */
import { describe, expect, it } from "@jest/globals";
import { getAllEntries, getEntries, getEntry, isKind, parseEntry } from "./content";

describe("parseEntry", () => {
  it("frontmatter と本文を読み取る", () => {
    const entry = parseEntry(
      "products",
      "demo",
      `---
title: Demo
date: 2026-01-02
summary: 概要
tags: [a, b]
links:
  - label: GitHub
    url: https://example.com
---

本文`,
    );
    expect(entry).toEqual({
      kind: "products",
      slug: "demo",
      title: "Demo",
      date: "2026-01-02",
      summary: "概要",
      tags: ["a", "b"],
      links: [{ label: "GitHub", url: "https://example.com" }],
      body: "本文",
    });
  });

  it("つぶやきはタイトルと概要を省略でき、概要は本文から作る", () => {
    const entry = parseEntry("notes", "n", "---\ndate: 2026-01-02\n---\n\n**WASM** を[試した](https://example.com)");
    expect(entry.title).toBeNull();
    expect(entry.summary).toBe("WASM を試した");
    expect(entry.tags).toEqual([]);
  });

  it.each(["products", "lab"] as const)("%s はタイトルなしだとエラーになる", (kind) => {
    expect(() => parseEntry(kind, "x", "---\ndate: 2026-01-02\n---\n本文")).toThrow("title は必須");
  });

  it.each([
    ["日付なし", "---\ntitle: T\n---\n本文", "date は YYYY-MM-DD"],
    ["日付の形式違い", '---\ntitle: T\ndate: "2026/1/2"\n---\n本文', "date は YYYY-MM-DD"],
    ["tags が文字列", "---\ntitle: T\ndate: 2026-01-02\ntags: a\n---\n本文", "tags は文字列の配列"],
    ["links に url がない", "---\ntitle: T\ndate: 2026-01-02\nlinks:\n  - label: L\n---\n本文", "label と url"],
  ])("%s はエラーになる", (_name, raw, message) => {
    expect(() => parseEntry("products", "x", raw)).toThrow(message);
  });
});

describe("content ディレクトリ", () => {
  it("全種類の投稿を読めて、新しい順に並ぶ", () => {
    const entries = getAllEntries();
    expect(new Set(entries.map((entry) => entry.kind))).toEqual(new Set(["products", "notes", "lab"]));
    const dates = entries.map((entry) => entry.date);
    expect(dates).toEqual([...dates].sort().reverse());
  });

  it("slug で取得でき、存在しなければ undefined を返す", () => {
    const [first] = getEntries("lab");
    expect(getEntry("lab", first.slug)).toEqual(first);
    expect(getEntry("lab", "no-such-entry")).toBeUndefined();
  });

  it("isKind は投稿の種類だけを受け入れる", () => {
    expect(isKind("lab")).toBe(true);
    expect(isKind("zenn")).toBe(false);
    expect(isKind("constructor")).toBe(false);
  });
});
