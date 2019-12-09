#!/usr/bin/sh

cd client
yarn
yarn start &

cd ..
cd server
yarn
yarn run dev

