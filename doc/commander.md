# commander
nodejs 命令行解决方案。[github](https://github.com/tj/commander.js)
## 声明program变量
```js
// commander 提供一个全局对象
const { program } = require('commander');
program.version('0.0.1');

// 程序复杂需要使用 commander 来创建 program
const { Command } = require('commander');
const program = new Command();
program.version('0.0.1');
```
## 选项
Commander 使用.option() 方法来定义选项，同时可以附加选项的简介。每个选项可以定义一个短选项名称（-后面接单个字符）和一个长选项名称（--后面接一个或多个单词），使用逗号、空格或|分隔。
```js
program
 .option('-d, --debug', 'output extra debugging')
 .option('-s, --small', 'small pizza size')
 .option('-p, --pizza-type <type>', 'flavour of pizza');

program.parse(process.argv);
```
### 必填选项
```js
program
  .requiredOption('-c, --cheese <type>', 'pizza must have cheese');
```
### 版本选项
```js
program.version('0.0.1');
```
### 默认选项
```js
program
  .option('-c, --cheese <type>', 'add the specified type of cheese', 'blue');
```
### 自定义选项
```js
program
  .option('-v, --verbose', 'verbosity that can be increased', increaseVerbosity, 0)
```
### boolean选项
boolean 不需要带参数
```js
program
 .option('-d, --debug', 'output extra debugging')
```
## command
TODO: 子命令怎么设置

