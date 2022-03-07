# 🏁 PWA Monorepo - Getting Started

These instructions will get you a copy of the project up and running on your local machine for testing purposes.

### ⚠️ Prerequisites

- Yarn: 2.4.1
- Node: 14.15.4

> WARN: Please use exact Node version and only use Yarn for package manager.

We recommend using [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) to manage and install Node.js, which makes it easy to change the version of Node.js per project.

### ⚙️ Installing

Clone project from github

```sh

git clone git@github.com:antoree/pwa-monorepo.git
cd pwa-monorepo

```

Install denpendencies

```sh

yarn install

```

And build internal packages

```sh

yarn workspace @antoree/ant-ui build
yarn workspace @antoree/helpers build


```

### 🎉 Starting Project in Workspace

From your project root type command for run an app locally.
All packages listing [here](../README.md#packages).

```sh

yarn workspace [package-name] start

```

Example: To start @antoree/next-admin project

```sh

yarn workspace @antoree/next-admin start

```
