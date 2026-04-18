#!/usr/bin/env bash
set -euo pipefail

WORKSPACE_DIR="$(cd "$(dirname "$0")" && pwd)"

# devcontainer名を取得（ワークスペースフォルダ名ベース）
CONTAINER_NAME=$(basename "$WORKSPACE_DIR" | tr '[:upper:]' '[:lower:]' | tr -cd '[:alnum:]-_')

# 起動中のコンテナを検索
RUNNING=$(podman ps --format "{{.Names}}" 2>/dev/null | grep -i "$CONTAINER_NAME" | head -1 || true)

if [ -z "$RUNNING" ]; then
  echo "コンテナが起動していません。起動します..."
  devcontainer up --workspace-folder "$WORKSPACE_DIR" --docker-path podman
  echo "コンテナに接続します..."
else
  echo "コンテナ '$RUNNING' は起動済みです。接続します..."
fi

devcontainer exec --workspace-folder "$WORKSPACE_DIR" --docker-path podman bash
