# ✨ PWA Monorepo - Contributing

## 📝 Table of Contents

- [Getting Started](#getting_started)
- [Coding Rules](#rules)
- [Commit Message Guidelines](#commits)

## <a name="getting_started"> 🏁 Getting Started

[See here](docs/getting_started.md)

## <a name="rules"> Coding Rules

[ESLint](https://eslint.org/) to keep the codebase clean and consistent.
The project use [this configuration](shared/eslint-config-ant#eslint-config-ant).

## <a name="commits"> Commit Message Guidelines

Make **git log** of the project more readable with [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

The commit message formatting can be added using a typical git workflow or through the use of a CLI wizard [Commitizen](https://github.com/commitizen/cz-cli). To use the wizard, run `yarn run commit` in your terminal after staging your changes in git.

### Commit Message Format

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>

```

### Commit Type Available

[See here](commitlint.config.js#L7-L20)
