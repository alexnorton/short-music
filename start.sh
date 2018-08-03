#!/bin/sh

tmux \
  new-session 'sh -c "cd client && yarn start"' \; \
  split-window 'sh -c "cd server && docker-compose up"' \; \
  attach
