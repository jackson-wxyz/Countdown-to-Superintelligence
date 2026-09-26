#!/bin/sh
# Copy the game into the jacksonw.xyz Hugo site, where it's served at https://jacksonw.xyz/countdown/
# Usage: tools/sync-to-blog.sh [path-to-jwxyz-checkout]   (default: a jwxyz checkout next to this repo)
set -e
HERE="$(cd "$(dirname "$0")/.." && pwd)"
BLOG="${1:-$HERE/../jwxyz}"
DEST="$BLOG/static/countdown"
rm -rf "$DEST"
mkdir -p "$DEST"
cp -R "$HERE/docs/." "$DEST/"
rm -f "$DEST/.DS_Store"
echo "Synced game to $DEST"
