# BUILD STATE
FROM node:14.15.4 AS build

RUN mkdir -p /usr/src
WORKDIR /usr/src/

## Copy Source code
COPY . .

RUN yarn --version 

## Install Dependencies
RUN yarn workspaces focus @antoree/antor

## Build Dependency Libs
RUN yarn workspace @antoree/ant-ui build
RUN yarn workspace @antoree/helpers build

## Environments
ENV SKIP_PREFLIGHT_CHECK=true

ARG PUBLIC_URL
ENV PUBLIC_URL=${PUBLIC_URL}

ARG REACT_APP_API_URI
ENV REACT_APP_API_URI=${REACT_APP_API_URI}

## Build Application
RUN yarn workspace @antoree/antor compile-messages
RUN yarn workspace @antoree/antor build

# PROD STATE
FROM nginx:stable-alpine as prod

COPY --from=build /usr/src/packages/antor/build /usr/share/nginx/html/

COPY packages/antor/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]