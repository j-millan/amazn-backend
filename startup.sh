#!/bin/sh

if ! test -f /app/migrations_completed; then
  npm run migration:run
  touch /app/migrations_completed
fi

exec npm run start:dev