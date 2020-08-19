class BaseError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CUSTOM_ERROR';
  }
}

export default BaseError;
