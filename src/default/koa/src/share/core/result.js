class Result {
  constructor(error, message = '', data) {
    this.message = message;
    if (data) {
      this.data = data;
    }
    if (error) {
      this.error = {
        message: error.message,
        code: error.code,
        name: error.name,
      };
    }
  }
}

export default Result;
