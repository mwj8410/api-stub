const jsDecorator =
`/* ***** ***** ***** ***** ***** ***** ***** ***** ***** ***** ***** */
/*                     This File Is Generated                        */
/*                      DO NOT MANUALLY EDIT!                        */
/* ***** ***** ***** ***** ***** ***** ***** ***** ***** ***** ***** */
`;

const requireBlock =
`const HttpRouteBase = require('../httpRouteBase');
const LogService = require('../../../lib/LogService');
const { ServiceEnum } = require('../../../lib/Enums');
const %name%Controller = require('../../controllers/%name%.controller');
`

const handlerClass =
`class %name%Handler extends HttpRouteBase {
    logger = LogService.get(ServiceEnum.%name%Handler);
    
    constructor(app) {
        super(ServiceEnum.%name%Handler);

        this.logger.verbose('%name%Handler Constructor');
        this.controller = %name%Controller.getService();
        this.httpMethod = '%httpMethod%';
        this.httpPath = '%httpPath%';

        this.handle = this.handle.bind(this);
        this.handleError = this.handleError.bind(this);;
        this._serviceReady = true;
    }

    async handle(req, resp) {
        this.logger.info(\`Processing Request\`);
        
        // Call the controller
        try {
            const responseBody = await this.controller.%httpMethod%();
            resp.status(200).send(responseBody);
        } catch (err) {
            this.handleError(req, resp, err);
        }
    }
}
`;

const exportStatement = `module.exports = %name%Handler;
`;

module.exports = {
    exportStatement,
    handlerClass,
    jsDecorator,
    requireBlock
};
