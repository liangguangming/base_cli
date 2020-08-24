# base_cli
nodejs 基本脚手架
## 支持功能
- eslint(airbnb)
- babel
- mocha
- koa2
- typescript
## 设计
commander 命令行基本使用</br>
inquirer 命令行交互</br>
ora 显示进度</br>
chalk 美化输出</br>
handlerbarjs 预编译模板
### 元数据
```json
{
  "name": "{{name}}", // 创建的项目名字
  "dirName": "{{dirName}}", // 项目的根目录名字
  "koaUrl": "direct:https://github.com/liangguangming/koa_template.git", // koa模板地址
  "url": "direct:https://github.com/liangguangming/config_template.git", // 配置模板，可以根据脚手架的update参数，更新本地的模板
  "destPath": "{{name}}",
  "config": { // 所有配置模板的自定义放在这里
    "mocha": {
      "destPath":"{{name}}/test", // 该项模板拷贝的位置
      "url": "direct:https://github.com/liangguangming/gdbts.git" // 获取模板的url
    }
  }
}
```
## 使用
```sh
# 安装所有依赖
npm install
# link到全局依赖
npm link
# 可以在任意一个目录使用脚手架了
base_cli init <name> # 在当前目录下创建一个新项目
# 更新模板并创建项目
base_cli init <name> --update
# 创建一个 typescript 项目
base_cli init <name> --typescript
```