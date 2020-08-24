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
const merge = require('merge');
const Handlebars = require('handlebars');

const prompt = require('./prompt');

const { log } = console;

let context = {};

const TMP_PATH = path.resolve(__dirname, '../tmp');

class Cli {
  static main() {
    log(chalk.bold.green('BASE CLI'));
    program
      // eslint-disable-next-line global-require
      .version(require('../package.json').version, '-v, --version')
      .option('-u, --update', 'update all templates')
      .option('-ts, --typescript', 'init a typescript project')
      .command('init <name>')
      .action(async (name) => {
        context.dirName = name;
        const isExist = fs.existsSync(context.dirName);
        if (isExist && !process.env.DEBUG) {
          log(chalk.red('existed projects'));
          process.exit(1);
        }
        if (!isExist) {
          fs.mkdirSync(context.dirName);
        }
        const tmpIsExist = fs.existsSync(TMP_PATH);
        if (tmpIsExist) {
          fs.rmdirSync(TMP_PATH, { recursive: true });
        }
        // 更新模板
        const isUpdateTemplate = program.opts().update;

        if (isUpdateTemplate) {
          const spinner = ora('update template');
          spinner.start();
          await Cli.updateAllTemplate().catch((err) => {
            spinner.fail(err.message);
            process.exit(1);
          });
          spinner.succeed();
        }
        // 是否是 typescript 项目
        const isTypescript = program.opts().typescript;
        const baseName = isTypescript ? 'ts' : 'default';
        copySync(path.resolve(__dirname, `./${baseName}/configTemplate`), TMP_PATH);
        // set template
        const answer = await Cli.startPrompt();
        context = Cli.getTemplate({ dirName: context.dirName, ...answer });
        const excepts = ['name', 'version', 'description', 'koa'];
        const config = {};
        // 不支持多选的prompt
        Object.keys(answer).forEach((key) => {
          if (!excepts.includes(key)) {
            config[key] = { value: answer[key] };
          } else {
            context[key] = answer[key];
          }
        });
        context = merge.recursive(true, context, { config });
        await Cli.startDownloadConfig();
        const proce = ora(chalk.blue('create project: ') + chalk.yellow(name));
        proce.start();

        // set base package
        const basePackage = {
          name: context.name,
          version: context.version,
          description: context.description,
        };
        // 整合创建一个 node 项目
        let projectPackage = {};

        if (answer.projectType === 'koa') {
          const projectPath = path.resolve(__dirname, `./${baseName}/koa`);
          projectPackage = Cli.copyAndGetProjectPackage(projectPath);
        } else {
          const projectPath = path.resolve(__dirname, `./${baseName}/base`);
          projectPackage = Cli.copyAndGetProjectPackage(projectPath);

          // set all config template
          projectPackage = Cli.setConfigTemplate(projectPackage);
        }

        fs.writeFileSync(path.resolve(context.dirName, 'package.json'), JSON.stringify({ ...projectPackage, ...basePackage }, null, 2));
        if (!answer.mocha) {
          const testPath = path.resolve(context.dirName, 'test');
          const isExistTest = fs.existsSync(testPath);
          if (isExistTest) {
            fs.rmdirSync(testPath, { recursive: true });
          }
        }
        proce.succeed();
      });

    program.parse(process.argv);
  }

  static async updateAllTemplate() {
    // 下载新模板到临时位置
    const tmpTemplatePath = path.resolve(__dirname, '../tmpTemplatePath');
    const isExist = fs.existsSync(tmpTemplatePath);
    if (isExist) {
      fs.rmdirSync(tmpTemplatePath, { recursive: true });
    }
    const template = Cli.getTemplate({});
    // 下载配置模板
    await Cli.downloadConfig(template.url, path.resolve(tmpTemplatePath, 'configTemplate'));
    // 下载koa模板
    await Cli.downloadConfig(template.koaUrl, path.resolve(tmpTemplatePath, 'koa'));
    // 移除旧模板
    fs.rmdirSync(path.resolve(__dirname, 'default/configTemplate'), { recursive: true });
    fs.rmdirSync(path.resolve(__dirname, 'default/koa'), { recursive: true });
    // 拷贝新模板到默认模板位置
    copySync(tmpTemplatePath, path.resolve(__dirname, 'default'));
  }

  static copyAndGetProjectPackage(projectPath) {
    copySync(projectPath, path.resolve(context.dirName));
    const defaultPackageStr = fs.readFileSync(path.resolve(projectPath, 'package.json'));
    return JSON.parse(defaultPackageStr);
  }

  static downloadConfig(url, target) {
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

  static async startPrompt() {
    const firstAnswer = await inquirer.prompt(prompt.getFirstPrompt(context));
    if (firstAnswer.projectType === 'koa') {
      return firstAnswer;
    }
    const secondAnswer = await inquirer.prompt(prompt.getPrompt());
    return { ...firstAnswer, ...secondAnswer };
  }

  static async startDownloadConfig() {
    const downloadProc = ora(chalk.green('downloading template'));
    const allDownloads = [];
    Object.keys(context.config).forEach((key) => {
      if (context.config[key].url) {
        const configPath = path.resolve(TMP_PATH, key);
        const tmpIsExist = fs.existsSync(configPath);
        if (tmpIsExist) {
          fs.rmdirSync(configPath, { recursive: true });
        }
        allDownloads.push(Cli.downloadConfig(context.config[key].url, configPath));
      }
    });
    downloadProc.start();
    await Promise.all(allDownloads).then(() => {
      downloadProc.succeed();
    }).catch((err) => {
      downloadProc.fail(err.message);
      throw err;
    });
  }

  static mergePackage(packagePath, finalPackage) {
    let tmpPackage = { ...finalPackage };
    const eslintPackagePath = path.resolve(packagePath);
    const eslintPackageStr = fs.readFileSync(eslintPackagePath);
    const eslintPackage = JSON.parse(eslintPackageStr);
    tmpPackage = merge.recursive(true, tmpPackage, eslintPackage);

    return tmpPackage;
  }

  // 设置所有配置模板
  static setConfigTemplate(finalPackage) {
    let tmpPackage = { ...finalPackage };
    Object.keys(context.config).forEach((key) => {
      if (context.config[key].value !== 'empty' && context.config[key].value) {
        const destPath = context.config[key].destPath || context.dirName;
        tmpPackage = Cli.setConfig(tmpPackage, key, path.resolve(destPath));
      }
    });

    return tmpPackage;
  }

  static setConfig(finalPackage, configName, destPath) {
    let tmpPackage = { ...finalPackage };
    const packagePath = path.resolve(TMP_PATH, `${configName}/package.json`);
    const isExist = fs.existsSync(packagePath);
    if (isExist) {
      tmpPackage = Cli.mergePackage(packagePath, finalPackage);
      // 删除tmp/configName的package
      fs.unlinkSync(packagePath);
    }

    const srcPath = path.resolve(TMP_PATH, configName);
    const isExistSrcPath = fs.existsSync(srcPath);
    if (isExistSrcPath) {
      copySync(path.resolve(TMP_PATH, configName), destPath);
    }

    return tmpPackage;
  }

  static getTemplate(con) {
    const templateStr = fs.readFileSync(path.resolve(__dirname, './meta/template.json'));
    const template = Handlebars.compile(templateStr.toString());
    return JSON.parse(template(con));
  }
}

Cli.main();
