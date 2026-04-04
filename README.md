# blog

## Development Container

Podman と devcontainer CLI を使った開発環境を用意しています。

### 前提

- [Podman](https://podman.io/)
- [devcontainer CLI](https://github.com/devcontainers/cli)

### コンテナの起動

```bash
devcontainer up --workspace-folder . --docker-path podman
```

### コンテナへの接続

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
