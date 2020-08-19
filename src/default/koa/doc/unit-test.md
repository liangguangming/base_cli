# 单元测试
覆盖所有用例
## 测试套件
- mocha 测试框架
- power-assert 断言库
- sinon 模拟
### mocha
基本构成
decribe + it
```js

```
#### 钩子
```shell
before
  beforeEach
    test
  afterEach
after
```
#### 异步测试
##### 回调式
```javascript
describe('User', function () {
  describe('#save()', function () {
    it('should save without error', function (done) {
      var user = new User('Luna');
      user.save(function (err) {
        if (err) done(err);
        else done();
      });
    });
  });
});
```
##### promise
直接返回 `Promise`代替回调
```js
beforeEach(function () {
  return db.clear().then(function () {
    return db.save([tobi, loki, jane]);
  });
});

describe('#find()', function () {
  it('respond with matching records', function () {
    return db.find({type: 'User'}).should.eventually.have.length(3);
  });
});

// 自定义Promise
const assert = require('assert');

// antipattern
it('should complete this test', function (done) {
  return new Promise(function (resolve) {
    assert.ok(true);
    resolve();
  }).then(done);
});
```
##### async/await
推荐使用这种方式
```js
beforeEach(async function () {
  await db.clear();
  await db.save([tobi, loki, jane]);
});

describe('#find()', function () {
  it('responds with matching records', async function () {
    const users = await db.find({type: 'User'});
    users.should.have.length(3);
  });
});
```
> 异步测试中，如果`done()`回调被调用多次，会触发错误。
#### 重复测试
`this.retries(4)`  重复测试四次
```js
describe('retries', function () {
  // Retry all tests in this suite up to 4 times
  this.retries(4);

  beforeEach(function () {
    browser.get('http://www.yahoo.com');
  });

  it('should succeed on the 3rd try', function () {
    // Specify this test to only retry up to 2 times
    this.retries(2);
    expect($('.foo').isDisplayed()).to.eventually.be.true;
  });
});
```
#### 动态生成数据测试
```js
var assert = require('chai').assert;

function add() {
  return Array.prototype.slice.call(arguments).reduce(function (prev, curr) {
    return prev + curr;
  }, 0);
}

describe('add()', function () {
  var tests = [
    {args: [1, 2], expected: 3},
    {args: [1, 2, 3], expected: 6},
    {args: [1, 2, 3, 4], expected: 10},
  ];

  tests.forEach(function (test) {
    it('correctly adds ' + test.args.length + ' args', function () {
      var res = add.apply(null, test.args);
      assert.equal(res, test.expected);
    });
  });
});
```
#### 测试间隔
默认测试间隔 *75ms*
```js
describe('something slow', function () {
  this.slow(300000); // five minutes

  it('should take long enough for me to go make a sandwich', function () {
    // ...
  });
});
```
#### 测试超时
```js
describe('a suite of tests', function () {
  this.timeout(500);

  it('should take less than 500ms', function (done) {
    setTimeout(done, 300);
  });

  it('should take less than 500ms as well', function (done) {
    setTimeout(done, 250);
  });
});
```
#### 生成报告
- spec
- dot
- nyan
- tap
- landing
- list
- progress
- json
- json-stream
- min
- doc
- markdown
- xunit
- html
#### TODO
BDD/TDD

### sinon
sinon 是一个独立的测试间谍，存根以及模拟的javacript库，能和一切单元测试框架协同工作。
#### sandbox
sinon的fakes,spies以及stubs都是被创建在默认的sandbox中。确保每一次测试之后存储这个sandbox。
```javascript
afterEach(() => {
  // Restore the default sandbox here 重置沙箱
  sinon.restore();
});
```
#### fakes
`fake` 允许你创建一个假的function来替代默认的行为。`set`的行为和 `sinon.stub`的API一样。创建 `fake Function`，拥有与不拥有的行为和`sinon.spy`的API一样。
`fake`是一个记录着参数，返回值，this的对象以及抛出异常的函数。一旦创建完成，不能修改。
##### 使用
```js
// create a basic fake, with no behavior
var fake = sinon.fake();

fake();
// undefined

fake.callCount;
// 1

// create a fake that returns the text "foo"
var fake = sinon.fake.returns('foo');

// create a fake that throw error
var fake = sinon.fake.throws(new Error('not apple pie'));

// 异步
sinon.fake.resolves(value);
sinon.fake.rejects(value);
sinon.fake.yields([value1, ..., valueN]);
sinon.fake.yieldsAsync([value1, ..., valueN]);

// 自定义fake函数
sinon.fake(func);
```
##### 属性
```js
f.callback
f.firstArg
f.lastArg
```
##### 替换系统方法
```js
var fake = sinon.fake.returns('42');

sinon.replace(console, 'log', fake);

console.log('apple pie');
// 42
```
#### spy
测试间谍是一个函数，记录着参数以及返回值，this的值以及抛出的异常。间谍类型
- 匿名函数
- 已存在系统的中函数

最佳实践，spy一个独立的方法。

##### 使用
```js
// 创建匿名间谍
require("@fatso83/mini-mocha").install();
const sinon = require("sinon");
const PubSub = require("pubsub-js");
const referee = require("@sinonjs/referee");
const assertTrue = referee.assert;

describe("PubSub", function() {
    it("should call subscribers on publish", function() {
        const callback = sinon.spy();

        PubSub.subscribe("message", callback);
        PubSub.publishSync("message");

        assertTrue(callback.called);
    });
});


// spy一个对象，该对象包含很多方法
sinon.spy(object)
// spy一个对象方法  eg : sinon.spy(jQuery, "ajax");
sinon.spy(object, "method")

// spy  get set方法
var object = {
  get test() {
    return this.property;
  },
  set test(value) {
    this.property = value * 2;
  }
};
var spy = sinon.spy(object, "test", ["get", "set"]);
object.test = 42;
assert(spy.set.calledOnce);
assert.equals(object.test, 84);
assert(spy.get.calledOnce);

// 当希望还原原来的调用时，spy.method.restore()
```
##### api
- `spy.withArgs(arg1[, arg2, ...]);`
在 withArgs 传进去的参数与调用的方法真实参数匹配时才记录，用于断言
```js
require("@fatso83/mini-mocha").install();

const sinon = require("sinon");
const referee = require("@sinonjs/referee");
const assert = referee.assert;

describe("withArgs", function() {
    it("should call method once with each argument", function() {
        const object = { method() {} };
        const spy = sinon.spy(object, "method");

        object.method(42);
        object.method(1);

        assert(spy.withArgs(42).calledOnce);
        assert(spy.withArgs(1).calledOnce);
    });
});
```
- `spy.callCount` 调用的记录次数
- `spy.called` true, 被调用过，至少调用一次
- `spy.notCalled` true, 没有被调用过
- `spy.calledOnce` true, 只调用一次
- `spy.calledTwice` true, 只调用两次
- `spy.calledThrice` true, 只调用三次
- `spy.firstCall` 第一次调用
- `spy.secondCall` 第二次调用
- `spy.lastCall` 最后一次调用
- `spy.calledBefore(anotherSpy);` 在某个spy之前调用
- `spy.calledAfter(anotherSpy);`
- `spy.alwaysCalledOn(obj);`  true, 调用该方法的obj作为this指针
- `spy.threw();` true, 抛出异常
- `spy.returned(obj);` true, 返回某个指定值
- `spy.restore();` 在replace某个存在的方法时，调用，既可以恢复原来的方法
#### stub 存根
Test stubs 是一个间谍函数，支持完整的spy api,另外的方法能被用来修改存根的行为。
##### 什么时候使用存根
1. 控制方法的行为，例如强制某个方法抛出一个错误，为了测试错误处理
2. 阻止一个方法被直接调用
##### API
```js
// 创建一个匿名存根
var stub = sinon.stub();

// 创建一个存根，并替换存根函数
var stub = sinon.stub(object, "method");
stub(obj, 'meth').callsFake(fn)

// 
stub.usingPromise(promiseLibrary);
```
