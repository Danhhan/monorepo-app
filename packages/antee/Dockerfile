# DEBUG STATE
FROM alpine AS debug
CMD ["echo", "Hello World!"]

# BUILD STATE
FROM node:14.15.4 AS build

RUN mkdir -p /usr/src
WORKDIR /usr/src/

## Copy Source code
COPY . .

RUN yarn --version 

## Install Dependencies
RUN yarn workspaces focus @antoree/antee

## Build Dependency Libs
RUN yarn workspace @antoree/ant-ui build
RUN yarn workspace @antoree/helpers build

## Environments
ENV SKIP_PREFLIGHT_CHECK=true

ARG PUBLIC_URL
ENV PUBLIC_URL=${PUBLIC_URL}

ARG REACT_APP_API_URI
ENV REACT_APP_API_URI=${REACT_APP_API_URI}

ARG REACT_APP_CROWDIN_DISTRIBUTION_HASH
ENV REACT_APP_CROWDIN_DISTRIBUTION_HASH=${REACT_APP_CROWDIN_DISTRIBUTION_HASH}

ARG REACT_APP_CROWDIN_FILE
ENV REACT_APP_CROWDIN_FILE=${REACT_APP_CROWDIN_FILE}

## Build Application
RUN yarn workspace @antoree/antee build

# PROD STATE
FROM nginx:stable-alpine as prod

COPY --from=build /usr/src/packages/antee/build /usr/share/nginx/html/

COPY packages/antee/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]