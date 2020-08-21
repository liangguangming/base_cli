class CreateUserDTO {
  /**
   * 创建用户
   * @param {{ name: string, age: number}} Object
   */
  constructor({ name, age }) {
    this.name = name;
    this.age = age;
  }
}

export default CreateUserDTO;
