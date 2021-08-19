'use strict';

// 3rd Party Modules
const config = require('config');
const express = require('express');
const swaggerUi = require('swagger-ui-express');

// Project Modules
const { httpRoutes } = require('./endpoints');
const LogService = require('../lib/LogService');
const { ServiceEnum } = require('../lib/Enums');
const ServiceRegistry = require('../lib/ServiceRegistry');
const openApiDocument = require('../documentation/openApi');

function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

class Host {
    static instance;

    app;

    config;

    logger = LogService.get(ServiceEnum.Host);

    server;

    constructor() {
        this.app = express();
        this.config = config.get('host');

        Host.instance = this;
    }

    static get() {
        if (!Host.instance) {
            new Host();
        }
        return Host.instance;
    }

    async start() {
        const routeServices = [];
        this.logger.verbose('Host startup sequence starting');
        // Accumulate http routes and initialize
        for (const routeHandler of httpRoutes) {
            const routeServiceInstance = new routeHandler();
            this.app[routeServiceInstance.httpMethod](routeServiceInstance.httpPath, routeServiceInstance.handle);
            routeServices.push(routeServiceInstance);
        }

        if (!config.get('app').isProd) {
            // Host Testing Features
            this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));
            this.logger.verbose('Hosting Documentation at /api-docs')
        }

        while (ServiceRegistry.get().allReady() === false) {
            await timeout(500);
        }

        for (const handler of routeServices) {
            handler.logInitialized();
        }

        // Open Http Listener
        this.server = this.app.listen(this.config.httpPort);
        this.logger.verbose(`Listening on HTTP port ${this.config.httpPort}`)
    }

    stop() {
        if (this.server) {
            this.server.stop();
            logger.verbose(`Server stopped for HTTP port ${this.hostConfig.httpPort}`)
        }
    }
}

module.exports = Host;
