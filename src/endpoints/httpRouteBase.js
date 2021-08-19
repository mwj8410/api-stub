const chalk = require('chalk');

const ServiceBase = require('../../lib/ServiceBase');
const { SafeHttpError, ErrorCodeEnum } = require('../../lib/SafeHttpError');
const LogService = require('../../lib/LogService');

module.exports = class HttpRouteBase extends ServiceBase {
    httpMethod;
    httpPath;

    logger = LogService.get('HttpRouteBase');

    requestBodyValidator;

    constructor(serviceName) {
        super(serviceName);
    }

    logInitialized() {
        let verb;
        switch (this.httpMethod) {
            case 'get':
                verb = chalk.green('GET');
                break;
            case 'patch':
                verb = chalk.yellow('PATCH');
                break;
            case 'post':
                verb = chalk.cyan('POST');
                break;
            case 'delete':
                verb = chalk.red('DELETE');
                break;
            default:
                throw new Error(`Unexpected HTTP verb: ${this.httpMethod}`);
        }

        this.logger.info(`Initializing: ${verb} ${this.httpPath}`);
    }

    async validate(req, resp) {
        this.logger.info('Processing');
        const bodyErrorsMessages = [];
        if (this.requestBodyValidator) {
            // Validate the request body is properly formed
            const bodyValidationResults = this.requestBodyValidator(req.body);
            if (bodyValidationResults !== true) {
                console.log('received invalid document!');
                bodyValidationResults.map(({field, message}) => {
                    bodyErrorsMessages.push(`Request body field "${field}": ${message}`);
                });
            }
        }

        if (!bodyErrorsMessages.length) {
            throw new SafeHttpError(ErrorCodeEnum.RequestBodyValidation, bodyErrorsMessages);
        }
    }

    /**
     *
     * @param req
     * @param resp
     * @param {SafeHttpError} error
     */
    handleError(req, resp, error) {
        // if (error.code) {
        //     resp.status(error.code).send(error.getResponseBody());
        // }
        console.error(error)
        resp.status(500).send();
    }
}