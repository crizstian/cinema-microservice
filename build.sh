#!/bin/bash
set -e

export DOCKERHUB_USERNAME=${DOCKERHUB_USERNAME:-michaelact}
export VERSION=${VERSION:-latest}

function setup-container-images {
    echo "···························"
    echo "·· creating microservices container images >>>>  ··"
    echo "···························"

    find * -type f -name "Dockerfile" -printf "%h\n" | xargs -I % sh -c "docker build -t $DOCKERHUB_USERNAME/wonderful-%:latest %/"
}

function setup-local {
	echo "···························"
    echo "·· creating microservices application on host >>>>  ··"
    echo ".. run export NODE_ENV=production to install only production modules"
    echo "···························"

    find * -maxdepth 1 -type f -name "package.json" -printf "%h\n" | xargs -I % sh -c 'cd % && npm cache clean && npm install --silent --progress=false)'
}

$@
