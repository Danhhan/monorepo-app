# BUILD STATE
FROM node:14.15.4 AS build

RUN mkdir -p /usr/src
WORKDIR /usr/src/

## Copy Source code
COPY . .

RUN yarn --version 

## Install Dependencies
RUN yarn workspaces focus @antoree/next-admin

## Build Dependency Libs
RUN yarn workspace @antoree/ant-ui build
RUN yarn workspace @antoree/helpers build

## Environments
ENV SKIP_PREFLIGHT_CHECK=true

ARG PUBLIC_URL
ENV PUBLIC_URL=${PUBLIC_URL}

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

ARG REACT_APP_METABASE_SECRET_KEY
ENV REACT_APP_METABASE_SECRET_KEY=${REACT_APP_METABASE_SECRET_KEY}

ARG REACT_APP_FIREBASE_PROJECT_ID
ENV REACT_APP_FIREBASE_PROJECT_ID=${REACT_APP_FIREBASE_PROJECT_ID}

ARG REACT_APP_FIREBASE_APP_ID
ENV REACT_APP_FIREBASE_APP_ID=${REACT_APP_FIREBASE_APP_ID}

ARG REACT_APP_FIREBASE_API_KEY
ENV REACT_APP_FIREBASE_API_KEY=${REACT_APP_FIREBASE_API_KEY}

ARG REACT_APP_FCM_SENDER_ID
ENV REACT_APP_FCM_SENDER_ID=${REACT_APP_FCM_SENDER_ID}

ARG REACT_APP_FCM_VAPID_KEY
ENV REACT_APP_FCM_VAPID_KEY=${REACT_APP_FCM_VAPID_KEY}

## Build Application
RUN yarn workspace @antoree/next-admin compile-messages
RUN yarn workspace @antoree/next-admin build

# PROD STATE
FROM nginx:stable-alpine as prod

COPY --from=build /usr/src/packages/next-admin/build /usr/share/nginx/html/v2

COPY packages/next-admin/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]