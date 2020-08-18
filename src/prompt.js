function getPrompt(context) {
  return [
    {
      name: 'name',
      message: 'the name of project',
      default: context.dirName,
    },
    {
      name: 'version',
      message: 'the version of project',
      default: '1.0.0',
    },
    {
      name: 'description',
      message: 'the description of project',
      default: `A project named ${context.dirName}`,
    },
    {
      name: 'eslint',
      type: 'list',
      message: 'choose eslint style',
      choices: ['airbnb', 'empty'],
    },
    {
      name: 'babel',
      type: 'confirm',
      message: 'use babel',
    },
    {
      name: 'mocha',
      type: 'confirm',
      message: 'use mocha',
    },
    {
      name: 'koa',
      type: 'confirm',
      message: 'use koa',
    },
  ];
}

module.exports = { getPrompt };
