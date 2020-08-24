import { describe, it } from 'mocha';
import * as assert from 'power-assert';

import { Test } from '../src/app';

describe('test', () => {
  const test = new Test('ming');
  it('sayHello', () => {
    assert(test.sayHello() === 'ming');
  });
});
