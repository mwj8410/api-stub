/* ***** ***** ***** ***** ***** ***** ***** ***** ***** ***** ***** */
/*                     This File Is Generated                        */
/*                      DO NOT MANUALLY EDIT!                        */
/* ***** ***** ***** ***** ***** ***** ***** ***** ***** ***** ***** */

const HttpRouteBase = require('../httpRouteBase');
const LogService = require('../../../lib/LogService');
const { ServiceEnum } = require('../../../lib/Enums');
const GetUsersController = require('../../controllers/GetUsers.controller');

class GetUsersHandler extends HttpRouteBase {
    logger = LogService.get(ServiceEnum.GetUsersHandler);
    
    constructor(app) {
        super(ServiceEnum.GetUsersHandler);

        this.logger.verbose('GetUsersHandler Constructor');
        this.controller = GetUsersController.getService();
        this.httpMethod = 'get';
        this.httpPath = '/user/:id';

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

module.exports = GetUsersHandler;

/* ***** ***** ***** ***** ***** ***** ***** ***** ***** ***** ***** */
/*                     This File Is Generated                        */
/*                      DO NOT MANUALLY EDIT!                        */
/* ***** ***** ***** ***** ***** ***** ***** ***** ***** ***** ***** */
