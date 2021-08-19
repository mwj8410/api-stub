const healthCheck = require('./generated/healthCheck.handler');

module.exports = {
    httpRoutes: [
        healthCheck
    ]
};
