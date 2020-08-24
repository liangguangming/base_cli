import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

enum Color {
  Red = 0,
  Green,
  Blue
}

fs.existsSync('test');

const c = Color.Green;

export class Test {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  sayHello() {
    return this.name;
  }
}

export default c;
