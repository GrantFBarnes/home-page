#!/bin/bash
# Script to start flask server in background
###############################################################################

if [ -z "$SUDO_USER" ]; then
    echo "Must be run with sudo"
    exit 1
fi

flask run --host=0.0.0.0 --port=80 &
