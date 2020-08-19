class UserListResDTO {
  constructor({ total = 0, list = [] }) {
    this.total = total;
    this.list = list;
  }
}

export default UserListResDTO;
