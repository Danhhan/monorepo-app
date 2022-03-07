# 🇻🇳 PWA Monorepo - Localize Guide

## 📝 Table of Contents

- [Setup Guide](#setup)
- [Translation Workflow](#workflow)

## <a name="setup"> ⚙️ Setup Guide

For localize applications, using [react-intl](https://formatjs.io/docs/react-intl) library and integrate with [Crowdin](https://crowdin.com/) - 3rd party TMS.

### 1. Installing Dependencies

Install dependencies in your package:

```sh

yarn workspace [package-name] add react-intl

yarn workspace [package-name] add -D babel-plugin-formatjs

```

and add it to your config file (Ex: [`.cracorc.js`](../packages/antee/.cracorc.js#L11-L22) or `.babelrc.js`).

```javascript
{
  "plugins": [
    [
      "formatjs",
      {
        "idInterpolationPattern": "[sha512:contenthash:base64:6]",
        "ast": true
      }
    ]
  ]
}
```

> Read [here](https://formatjs.io/docs/getting-started/installation) for more info.

Finaly add some reuseable scripts into `package.json` file:

```json
{
  "scripts": {
    "extract-messages:crowdin": "formatjs extract 'src/**/*.{ts,tsx}' --out-file src/translations/locales/crowdin.json --id-interpolation-pattern '[sha512:contenthash:base64:6]' --format crowdin",
    "compile-messages:en": "formatjs compile src/translations/locales/en_US.extracted.json --ast --out-file src/translations/locales/en_US.json --format crowdin",
    "compile-messages:vi": "formatjs compile src/translations/locales/vi_VN.extracted.json --ast --out-file src/translations/locales/vi_VN.json --format crowdin",
    "compile-messages": "yarn compile-messages:en && yarn compile-messages:vi"
  }
}
```

### 2. Crowdin Configuration

Add new packge to Crowdin project by adding new value to `files` property in [crowdin configuration file](../crowdin.yml).

Example:

```yml
files:
  - source: /packages/antee/src/translations/locales/crowdin.json
    translation: >-
      /packages/antee/src/translations/locales/%locale_with_underscore%.extracted.json
```

> Read [crowdin docs](https://support.crowdin.com/github-integration/) for more info.

## <a name="workflow"> 🕵️‍♂️ Translation Workflow

### 1. Define messages descriptor (with defineMessage/FormattedMessage/formatMessage).

Example:

```javascript
<FormattedMessage defaultMessage="Welcome back to Antoree" />;

// Or
intl.formatMessage({
  defaultMessage: 'Email or Phone Number',
});

// Or
defineMessage({ defaultMessage: 'Open' });
```

### 2. Extract these messages into JSON file for translation vendor (Crowdin) and commit.

Using this command before commit:

```sh

yarn workspace [package-name] extract-messages:crowdin

```

Example:

```sh

yarn workspace @antoree/antee extract-messages:crowdin

```

### 3. All new messages will be auto upload to Crowdin for translating after merged into develop branch.

### 4. Download translated messages via Github intergration in Crowdin.

### 5. Finally, build & test app in staging environment before production release.
