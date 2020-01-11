FROM node:alpine

# Node from alpine does not include python(2). So, it always fails.
RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python
RUN npm install --quiet node-gyp -g
