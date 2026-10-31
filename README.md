# blog

Next.js 製の個人ブログです。自作プロダクトの紹介、技術的なつぶやき、WASM などの実験を掲載します。

## 開発環境

[Workshop](https://ubuntu.com/workshop/docs/) (Ubuntu) で開発環境を用意します。定義は `.workshop/dev.yaml` にあり、Node.js、pnpm (Corepack)、Rust が入ります。

```bash
# 前提 (初回のみ)
sudo snap install --channel=6/stable lxd
sudo snap install --classic workshop

workshop launch dev     # 環境を作る (初回のみ)
workshop run -- setup   # 依存関係を入れる
workshop run -- dev     # 開発サーバーを起動する → http://127.0.0.1:5173
```

| コマンド | 内容 |
| --- | --- |
| `workshop run -- dev` | 開発サーバーを起動 |
| `workshop run -- check` | 型チェック、テスト、ビルドをまとめて実行 |
| `workshop run -- test` | テストを実行 |
| `workshop run -- build` | 本番ビルド |
| `workshop run -- wasm` | WASM デモをビルド |
| `workshop shell` | ワークショップ内のシェルに入る (プロジェクトは `/project`) |

## 投稿の書き方

`apps/web/content/` に MDX ファイルを追加すると、ファイル名を URL とするページができます。

| ディレクトリ | 内容 | URL |
| --- | --- | --- |
| `products/` | 自作プロダクトの紹介 | `/products/<ファイル名>` |
| `notes/` | 技術的なつぶやき | `/notes/<ファイル名>` |
| `lab/` | WASM などの実験 | `/lab/<ファイル名>` |

```mdx
---
title: タイトル             # products と lab は必須、notes は省略可
date: 2026-10-31            # 必須
summary: 一覧に出す概要      # 省略すると本文の冒頭から作る
tags: [WASM, Rust]          # 省略可
links:                      # 省略可
  - label: GitHub
    url: https://github.com/Coxless/blog
---

本文 (Markdown)
```

frontmatter が不正な場合はビルドがエラーになります。

## WASM などのデモを追加する

1. `apps/web/src/components/demos/` にクライアントコンポーネントを作ります。
2. `apps/web/src/components/demos/index.ts` に登録します。
3. `content/lab/` の MDX から `<WasmFib />` のように呼び出します。

Rust のコードは `packages/wasm-demo` にあります。変更したら `workshop run -- wasm` でビルドし、生成された `apps/web/public/wasm/demo.wasm` もコミットしてください。デプロイ時と CI では Rust を使いません。
