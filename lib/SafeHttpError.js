const ErrorCodeEnum = {
    RequestBodyValidation: 'REQUEST_VALIDATION'
};

const StandardResponses = {
  [ErrorCodeEnum.RequestBodyValidation]: {
      statusCode: 422,
      /**
       *
       * @param {string[]} detail
       * @returns {{errorCode: string, error: boolean, detail: string[]}}
       */
      body: (detail) => ({
          error: true,
          errorCode: ErrorCodeEnum.RequestBodyValidation,
          detail
      })
  }
};

/**
 * @type SafeHttpError
 *
 * @param {string} code HTTP response status code
 * @param {string[]} detail A list of messages describing the error for the end-user.
 * @param {function} getResponseBody Provides the response body payload for the error.
 */
class SafeHttpError extends Error {
    code;
    detail; // Array of strings related to the error

    /**
     *
     * @param {string} errorCode
     * @param {string[]} detail Public details for the error
     */
    constructor(errorCode, detail) {
        super(errorCode);
        this.code = errorCode;
        this.detail = detail;
    }

    getResponseBody() {
        return StandardResponses[this.code].body(this.detail);
    }
}

module.exports = {
    ErrorCodeEnum,
    SafeHttpError
}