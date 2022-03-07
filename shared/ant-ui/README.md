# @antoree/ant-ui

The Antoree UI is a collection of React UI components for quickly building user interfaces at @Antoree. Let’s get you oriented with what’s here and how to use it.

## Installation

To install the Antoree UI Framework into an existing project, use the yarn CLI

```bash
yarn add @antoree/ant-ui
```

Note that _@antoree/ant-ui_ has [several `peerDependencies` requirements](package.json) that will also need to be installed if starting with a blank project. You can read more about other ways to consume Antoree UI.

```bash
yarn add react react-dom react-router-dom
```

## Usage

Most of the time, you just need the compiled CSS, which provides the styling for the React components.

```js
import '@antoree/ant-ui/dist/ant_ui_compiled.css';
```
