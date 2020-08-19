# 杂记
## modules
模块的用法
### debug
[debug_github](!https://github.com/visionmedia/debug)</br>
#### 代码使用
```js
// 引入debug  yarn add debug
const debug = require('debug');
// 创建某一个命名空间的debugger
const httpDebugger = debug('http')
// 打印log
httpDebugger('http request');
```
#### 配置debug

通过环境变量控制debug
```sh
# 环境变量控制debug  * 为通配符  - 除掉的命名空间
DEBUG=ddd:*,-ddd:*:debug  # 打开与关闭相应的命名空间，这里表示：打开所有ddd:开头的debugger,然后关闭ddd:开头且:debug结尾的debugger

# 打印对象深度
DEBUG_DEPTH=5
```