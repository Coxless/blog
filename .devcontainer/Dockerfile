FROM debian:bullseye-slim

ARG USERNAME=dev-user
ARG USER_UID=1000
ARG USER_GID=${USER_UID}

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ca-certificates \
        curl \
        git \
        sudo \
        unzip \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN groupadd --gid ${USER_GID} ${USERNAME} \
    && useradd --uid ${USER_UID} --gid ${USER_GID} -m ${USERNAME} -s /bin/bash \
    && echo "${USERNAME} ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/${USERNAME} \
    && chmod 0440 /etc/sudoers.d/${USERNAME}

USER ${USERNAME}
WORKDIR /home/${USERNAME}

# Install mise
RUN curl https://mise.run | sh \
    && echo 'eval "$(/home/dev-user/.local/bin/mise activate bash)"' >> ~/.bashrc

# Install starship
RUN curl -sS https://starship.rs/install.sh | sh -s -- --yes \
    && echo 'eval "$(starship init bash)"' >> ~/.bashrc
