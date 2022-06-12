# syntax=docker/dockerfile:1
FROM node:12-alpine

ENV PORT=3000 \
MESSAGE="hello from docker" \
DD_ENV="development" \
DD_PROFILING=true \
DD_AGENT_HOST=host.docker.internal \
DD_TRACE_AGENT_PORT=8126 \
DD_TRACE_DEBUG=true

RUN apk add --no-cache python2 g++ make
RUN mkdir -p /home/app
COPY . /home/app
EXPOSE 3000
CMD cd /home/app && npm ci && node --max-old-space-size=512 index.js