# blog

## Development Container

Podman と devcontainer CLI を使った開発環境を用意しています。

### 前提

- [Podman](https://podman.io/)
- [devcontainer CLI](https://github.com/devcontainers/cli)

### コンテナの起動・接続（推奨）

起動チェックと接続を一括で行うスクリプトを用意しています。

```bash
./dev.sh
```

コンテナが起動していない場合は自動で起動してから接続し、すでに起動済みの場合はそのまま接続します。

### コンテナの起動（手動）

```bash
devcontainer up --workspace-folder . --docker-path podman
```

### コンテナへの接続（手動）

```bash
devcontainer exec --workspace-folder . --docker-path podman bash
```

### コンテナの停止

```bash
podman pause {NAME}
```

### コンテナの再開

```bash
podman unpause {NAME}
```
