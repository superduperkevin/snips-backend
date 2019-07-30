/**
 * Error object containing user friendly message and an HTTP status code.
 */

class ErrorWithHttpStatus extends Error {
  /**
   *
   * @param {@string} message
   * @param {*} status
   */
  constructor(message, status = 500) {
    super(message);
    this.status = status;
  }
}

module.exports = ErrorWithHttpStatus;
