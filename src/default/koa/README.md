# node_ddd基础项目
## 库组成
- airbnb-base的eslint代码风格检查
- babel 代码转换
- mocha/sinon/power-assert 单元测试
- mongoose/mongodb
- koa/koa-body/koa-session/koa-router
- ajv 数据校验
- debug  输出日志

# DDD
## 语言选择
建议选用面向对象的语言，假设node的环境，建议选择：typescript
## 要点
### 事件
单一职责，完成一个事件，往外投递事件
模块间的通信——通过事件
高层订阅事件，模块启动前注册事件

订阅事件，投递事件，开始分发事件

用例不涉及事件的订阅、投递与分发
### 实体
实体要有唯一ID来判断是否一样
有唯一ID为创建，没有为初始化构建实体
### 工程目录
```shell
- share/base
- modules
  - users
    - domains  // 实体和值对象
      - entity
      - errors  // 或者把这个放在用例中
      - valueObjects // 
    - repos    // 数据仓库
    - mappers  // 建立数据仓库与实体、DTO（响应回去的对象）的关联，中心是实体
    - services // 服务 ？？
    - dtos    // 数据传输对象 或者放在用例
    - cases   // 用例
      - errors  // 各用例共享的error
      - dtos   // 各用例共享的dtos
      - users  // 用户相关用例
- app // 工程入口 
```