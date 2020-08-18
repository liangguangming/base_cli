#!/usr/bin/env node
require('dotenv').config();
const program = require('commander');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const ora = require('ora');
const inquirer = require('inquirer');
const download = require('download-git-repo');
const { copySync } = require('fs-extra');

const { log } = console;

const context = {};

function downloadConfig(url, target) {
  return new Promise((resolve, reject) => {
    download(url, target, { clone: true }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// 获取模板配置
function getTemplate() {
  const templateStr = fs.readFileSync(path.resolve(__dirname, './meta/template.json'));
  return JSON.parse(templateStr);
}

async function startPrompt() {
  const answer = await inquirer.prompt([
    {
      name: 'name',
      message: 'the name of project',
      default: context.name,
    },
    {
      name: 'version',
      message: 'the version of project',
      default: '1.0.0',
    },
    {
      name: 'description',
      message: 'the description of project',
      default: `A project named ${context.name}`,
    },
    {
      name: 'eslint',
      type: 'list',
      message: 'choose eslint style',
      choices: ['airbnb', 'no'],
    },
    {
      name: 'babel',
      type: 'confirm',
      message: 'use babel',
    },
    {
      name: 'koa',
      type: 'confirm',
      message: 'use koa',
    },
  ]);
  context.config = answer;
  const downloadProc = ora(chalk.green('downloading template'));
  downloadProc.start();
  const template = getTemplate();
  await downloadConfig(template.url, 'tmp').then(() => {
    downloadProc.succeed();
  }).catch((err) => {
    downloadProc.fail(err.message);
    throw err;
  });
}

log(chalk.bold.green('BASE CLI'));
program
  .version(require('../package').version, '-v, --version')
  .command('init <name>')
  .action(async (name) => {
    context.name = name;
    const isExist = fs.existsSync(name);
    if (isExist && !process.env.DEBUG) {
      log(chalk.red('existed projects'));
      process.exit(1);
    }
    if (!isExist) {
      fs.mkdirSync(name);
    }
    const tmpIsExist = fs.existsSync('tmp');
    if (tmpIsExist) {
      fs.rmdirSync('tmp', { recursive: true });
    }
    await startPrompt();
    const proce = ora(chalk.blue('create project: ') + chalk.yellow(name));
    proce.start();
    // 整合创建一个 node 项目
    // 创建一个 package.json
    const defaultPackageStr = fs.readFileSync(path.resolve(__dirname, './default/package.json'));
    const finalPackage = JSON.parse(defaultPackageStr);

    copySync(path.resolve(__dirname, './default'), path.resolve(context.config.name));

    // set base config
    finalPackage.name = context.config.name;
    finalPackage.version = context.config.version;
    finalPackage.description = context.config.description;

    // set eslint
    if (context.config.eslint !== 'no') {
      const eslintPackagePath = path.resolve('tmp/eslint/package.json');
      const eslintPackageStr = fs.readFileSync(eslintPackagePath);
      const eslintPackage = JSON.parse(eslintPackageStr);
      Object.assign(finalPackage.dependencies, eslintPackage.dependencies || {});
      Object.assign(finalPackage.devDependencies, eslintPackage.devDependencies || {});
      finalPackage.husky = eslintPackage.husky;
      Object.assign(finalPackage.scripts, eslintPackage.scripts || {});
      fs.copyFileSync(path.resolve('tmp/eslint/.eslintrc.json'), path.resolve(context.config.name, '.eslintrc.json'));
    }

    // set babel
    if (context.config.babel) {
      const babelPackagePath = path.resolve('tmp/babel/package.json');
      const babelPackageStr = fs.readFileSync(babelPackagePath);
      const babelPackage = JSON.parse(babelPackageStr);
      Object.assign(finalPackage.dependencies, babelPackage.dependencies || {});
      Object.assign(finalPackage.devDependencies, babelPackage.devDependencies || {});
      Object.assign(finalPackage.scripts, babelPackage.scripts || {});
      fs.copyFileSync(path.resolve('tmp/babel/babel.config.js'), path.resolve(context.config.name, 'babel.config.js'));
    }
    fs.writeFileSync(path.resolve(context.config.name, 'package.json'), JSON.stringify(finalPackage, null, 2));
    proce.succeed();
  });

program.parse(process.argv);
