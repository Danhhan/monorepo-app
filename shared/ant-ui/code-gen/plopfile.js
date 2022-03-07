module.exports = plop => {
  plop.setGenerator('ant-ui-component', {
    description: 'Create Antoree UI component base on Elastic UI',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?',
        validate(value) {
          if (value === '') {
            return 'Please enter a valid component';
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'euiName',
        message: 'What is component name import from Elastic UI?',
        validate(value) {
          if (value === '') {
            return 'Please enter a valid component from Elastic UI';
          }
          return true;
        },
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../src/components/{{pascalCase name}}/index.tsx',
        templateFile: 'component/ui-component-index.tsx.hbs',
      },
      {
        type: 'append',
        path: '../src/index.tsx',
        pattern: `/* PLOP_INJECT */`,
        template: `export * from './components/{{pascalCase name}}';`,
      },
    ],
  });
};
