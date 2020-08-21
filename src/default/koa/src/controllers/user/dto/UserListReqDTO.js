class UserListReqDTO {
  constructor({ limit = 10, page = 1, search = null }) {
    this.limit = limit;
    this.page = page;
    this.search = search;
  }
}

export default UserListReqDTO;
