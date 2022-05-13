#!/bin/bash
set -e

kubectl $1 -f configmap/$NAMESPACE/
kubectl -n $NAMESPACE $1 --recursive -f application/
kubectl $1 -f ingress/$NAMESPACE/
