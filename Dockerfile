FROM node:13.1

LABEL repository="https://github.com/cometkim/yarn-plugin-bump"
LABEL maintainer="Hyeseong Kim <cometkim.kr@gmail.com>"

ENV PLUGIN_VERSION="0.0.3"
ENV PLUGIN_REMOTE="https://github.com/cometkim/yarn-plugin-bump/releases/download/v0.0.1/plugin-bump.js"

RUN apt update && apt install -y --no-install-recommends \
    ca-certificates \
    git \
  && apt autoclean \
  && apt autoremove -y \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /action
COPY entrypoint.sh .

RUN chmod u+x /action/entrypoint.sh
ENTRYPOINT ["/action/entrypoint.sh"]
