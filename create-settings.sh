#!/bin/sh

DIR="$(cd "$(dirname "$0")" && pwd)"
GITIGNORE=$DIR/.gitignore

if [ -z "$NEXUS_REGISTRY_URL" ] || [ -z "$NEXUS_USERNAME" ] || [ -z "$NEXUS_PASSPHRASE" ]; then
    >&2 echo "Error - NEXUS_REGISTRY_URL, NEXUS_USERNAME, and NEXUS_PASSPHRASE environment variables are required"
    exit 1
fi

echo "registry=$NEXUS_REGISTRY_URL" > $DIR/.npmrc
echo "_auth=$(echo -n "$NEXUS_USERNAME:$NEXUS_PASSPHRASE" | base64)" >> $DIR/.npmrc

if grep -q "^\.npmrc$" $GITIGNORE; then
    echo "Success - .npmrc found in $GITIGNORE file. This will prevent git from saving the Nexus registry URL and credentials in version control."
else
    echo "Warning - .npmrc not found in $GITIGNORE file. Add .npmrc to $GITIGNORE to ensure you don't accidentally commit your Nexus registry URL and credentials!"
fi

echo "Success - Node.js configuration completed."