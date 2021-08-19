const ServiceRegistry = require('./ServiceRegistry');

class ServiceBase {
    static instance;
    constructor(serviceName) {
        if (!serviceName) {
            throw new Error('Attempt to construct a Service without a name!');
        }

        this._serviceName = `${serviceName}`;
        this._serviceReady = false;
        ServiceRegistry.get().register(this._serviceName, this);
    }

    isReady() {
        return this._serviceReady;
    }
}

module.exports = ServiceBase;
