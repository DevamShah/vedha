#!/bin/bash
set -euo pipefail

TARGET_UID="${SHANNON_HOST_UID:-}"
TARGET_GID="${SHANNON_HOST_GID:-}"
CURRENT_UID=$(id -u pentest 2>/dev/null || echo "")

# Validate UID/GID are numeric before using in system commands
if [ -n "$TARGET_UID" ]; then
  if ! [[ "$TARGET_UID" =~ ^[0-9]+$ ]] || [ "$TARGET_UID" -lt 1 ] || [ "$TARGET_UID" -gt 2000000 ]; then
    echo "ERROR: Invalid SHANNON_HOST_UID: $TARGET_UID (must be numeric, 1-2000000)"
    exit 1
  fi
fi
if [ -n "$TARGET_GID" ]; then
  if ! [[ "$TARGET_GID" =~ ^[0-9]+$ ]] || [ "$TARGET_GID" -lt 1 ] || [ "$TARGET_GID" -gt 2000000 ]; then
    echo "ERROR: Invalid SHANNON_HOST_GID: $TARGET_GID (must be numeric, 1-2000000)"
    exit 1
  fi
fi

if [ -n "$TARGET_UID" ] && [ "$TARGET_UID" != "$CURRENT_UID" ]; then
  userdel pentest 2>/dev/null || true
  groupdel pentest 2>/dev/null || true

  groupadd -g "$TARGET_GID" pentest
  useradd -u "$TARGET_UID" -g pentest -s /bin/bash -M pentest

  chown -R pentest:pentest /app/sessions /app/workspaces /tmp/.claude
fi

exec su -m pentest -c "exec $*"
