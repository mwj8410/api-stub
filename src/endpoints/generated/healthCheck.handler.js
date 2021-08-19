/* ***** ***** ***** ***** ***** ***** ***** ***** ***** ***** ***** */
/*                     This File Is Generated                        */
/*                      DO NOT MANUALLY EDIT!                        */
/* ***** ***** ***** ***** ***** ***** ***** ***** ***** ***** ***** */

const HttpRouteBase = require('../httpRouteBase');
const LogService = require('../../../lib/LogService');
const { ServiceEnum } = require('../../../lib/Enums');
const HealthCheckController = require('../../controllers/HealthCheck.controller');

class HealthCheckHandler extends HttpRouteBase {
    logger = LogService.get(ServiceEnum.HealthCheckHandler);
    
    constructor(app) {
        super(ServiceEnum.HealthCheckHandler);

        this.logger.verbose('HealthCheckHandler Constructor');
        this.controller = HealthCheckController.getService();
        this.httpMethod = 'get';
        this.httpPath = '/healthCheck';

        this.handle = this.handle.bind(this);
        this.handleError = this.handleError.bind(this);;
        this._serviceReady = true;
    }

    async handle(req, resp) {
        this.logger.info(`Processing Request`);
        
        // Call the controller
        try {
            const responseBody = await this.controller.get();
            resp.status(200).send(responseBody);
        } catch (err) {
            this.handleError(req, resp, err);
        }
    }
}

module.exports = HealthCheckHandler;

/* ***** ***** ***** ***** ***** ***** ***** ***** ***** ***** ***** */
/*                     This File Is Generated                        */
/*                      DO NOT MANUALLY EDIT!                        */
/* ***** ***** ***** ***** ***** ***** ***** ***** ***** ***** ***** */
