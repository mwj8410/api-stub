const ServiceBase = require('../../lib/ServiceBase');
const { ServiceEnum } = require('../../lib/Enums');

class HealthCheckController extends ServiceBase {
    constructor() {
        super(ServiceEnum.HealthCheckController);

        this._serviceReady = true;
        HealthCheckController.instance = this;
    }

    static getService() {
        if (!HealthCheckController.instance) {
            new HealthCheckController();
        }
        return HealthCheckController.instance;
    }

    async get() {
        return { ok: true };
    }
}

module.exports = HealthCheckController;