#!/bin/bash

ROOT_DIR=$(pwd)
REDIS_DATA="$ROOT_DIR/data/redis"

mkdir -p "$REDIS_DATA"

docker pull redis
docker stop local-redis
docker rm local-redis

docker run \
        -d  \
        --name local-redis \
        -p 6379:6379 \
        -v $REDIS_DATA:/data \
        redis \
        --appendonly yes

