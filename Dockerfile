FROM node:13.1

LABEL repository="https://github.com/cometkim/yarn-plugin-bump"
LABEL maintainer="Hyeseong Kim <cometkim.kr@gmail.com>"

ENV PLUGIN_SOURCE="https://github.com/cometkim/yarn-plugin-bump"
ENV PLUGIN_VERSION="0.0.4"

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
