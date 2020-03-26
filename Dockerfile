FROM node:alpine

LABEL repository="https://github.com/cometkim/yarn-plugin-bump"
LABEL maintainer="Hyeseong Kim <cometkim.kr@gmail.com>"

ENV PLUGIN_VERSION="0.0.3"
ENV PLUGIN_REMOTE="https://github.com/cometkim/yarn-plugin-bump/releases/download/v0.0.1/plugin-bump.js"

# TODO pre-installed script
# ENV PLUGIN_LOCAL=""

RUN apk add --no-cache \
  git \
  bash \
  ca-certificates

WORKDIR /action
COPY entrypoint.sh .

RUN chmod +x entrypoint.sh

ENTRYPOINT ["/action/entrypoint.sh"]
