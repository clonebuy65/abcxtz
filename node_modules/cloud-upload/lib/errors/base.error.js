'use strict';

class BaseError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CloudUploadBaseError';
  }
}

module.exports = BaseError;
