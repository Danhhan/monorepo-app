# eslint-config-ant

This package includes the shareable ESLint configuration used at Antoree.

## 🚀 Using a Shareable Config

Shareable configs are designed to work with the extends feature of `.eslintrc` files. Instead of using a file path for the value of `extends`.
For example:

```
{
    "extends": "@antoree/eslint-config-ant"
}
```

That's it! You can override the settings from `eslint-config-ant` by editing the `.eslintrc` file. Learn more about [configuring ESLint](https://eslint.org/docs/user-guide/configuring) on the ESLint website.

## 🎉 Behind this package

The following rules from these packages:

- [eslint-config-react-app](https://github.com/facebook/create-react-app/tree/master/packages/eslint-config-react-app)
- [airbnb](https://github.com/airbnb/javascript)
