const LogService = require('../lib/LogService');
const Host = require('./host');

const startup = async () => {
    // Resolve any async config

    // Start the Host
    const host = Host.get();
    await host.start();
};

startup()
    .then()
    .catch((err) => {
        LogService.get('Main').error(err);
        throw err;
    });