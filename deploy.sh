#!/bin/bash

export NAMESPACE=${NAMESPACE:-staging}

# @param <delete|apply|diff>
function kubernetes {
	cd deploy/kubernetes/

	./deploy.sh $1
}

$@
