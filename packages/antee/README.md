<h3 align="center">@antoree/antee</h3>

<p align="center">Antoree + Mentee 👉 Antee</p>
<p align="center">🧒 The Antoree PWA for Students</p>

## 📝 Table of Contents

- [Getting Started](#getting_started)
- [Project Structure](#structure)
- [Translation Workflow](#translation_workflow)
- [Built Using](#built_using)
- [TODO](../TODO.md)

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them.

- Yarn: 2.4.1
- Node: 14.15.4

> WARN: Ony use Yarn for package manager.

### Installing

A step by step series that tell you how to get a development env running.

Install a single workspace and its dependencies.

```

yarn workspaces focus @antoree/antee

```

Build internal libs it depend on.

```

yarn workspace @antoree/ant-ui build
yarn workspace @antoree/helpers build

```

Create local environment variables.

```

cp packages/antee/.env.development packages/antee/.env.local

```

Finally start development & testing in local.

```

yarn workspace @antoree/antee start

```

## 🏗 Project Structure <a name = "structure"></a>

```
packages/antee
|-- public
|-- src
|   |-- assets
|   |   |-- icons
|   |   |-- images
|   |   |-- styles
|   |
|   |-- components
|   |   |-- CommonComponent
|   |   |   |-- CommonComponent.module.scss
|   |   |   |-- CommonComponent.tsx
|   |   |   |-- index.tsx
|   |   |-- ... (orther common components)
|   |   |-- index.tsx
|   |
|   |-- configs
|   |   |-- ... (common config right here)
|   |   |-- index.tsx
|   |
|   |-- containers
|   |   |-- HomePage
|   |   |   |-- components
|   |   |   |   |-- ComponentUsedInPage
|   |   |   |   |-- ... (orther common components used in page)
|   |   |   |   |-- index.tsx
|   |   |   |
|   |   |   |-- index.tsx
|   |   |   |-- HomePage.module.scss
|   |   |   |-- HomePage.tsx
|   |   |
|   |   |-- SignInPage
|   |   |-- ...
|   |
|   |-- helpers
|   |-- hooks
|   |
|   |-- services
|   |   |-- course
|   |   |   |-- index.tsx
|   |   |   |-- retrieveCourses.tsx
|   |   |   |-- retrieveTodayCourses.tsx
|   |   |
|   |   |-- session
|   |   |-- user
|   |
|   |-- translations
|   |   |-- entries
|   |   |-- locales
|   |   |-- index.ts
|   |
|   |-- utils
|   |
|   |-- AppProvider.tsx
|   |-- App.tsx
|   |-- index.tsx
|
|-- .cracorc.js
|-- package.json
|-- tsconfig.json

```

## 🇻🇳 Translation Workflow <a name = "translation_workflow"></a>

Project use [react-intl](https://formatjs.io/docs/react-intl/) for internationalize.
See [here](../../docs/localize_guide.md#workflow) for more details.

## ⛏️ Built Using <a name = "built_using"></a>

- [React Hook Form](https://react-hook-form.com/) - Performant, flexible and extensible forms with easy-to-use validation.
- [React Query](https://react-query.tanstack.com/) - Fetch, cache and update data in your React and React Native applications all without touching any "global state".
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework packed with classes.

for short:

yarn workspaces focus @antoree/antee
yarn workspace @antoree/ant-ui build
yarn workspace @antoree/helpers build
yarn workspace @antoree/antee start
