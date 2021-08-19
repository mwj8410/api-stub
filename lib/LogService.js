'use strict';

const chalk = require('chalk');

const ServiceBase = require('./ServiceBase');

/**
 * An opinionated wrapper for the winston loggerService.
 * @type {Logger}
 * @param {function} error
 * @param {function} warn
 * @param {function} info
 * @param {function} http
 * @param {function} verbose
 * @param {function} debug
 * @param {function} silly
 */

class LogService extends ServiceBase {
    constructor(serviceName) {
        super(serviceName);
    }

    static get(logPrefix) {
        /** @type {Logger} */
        return {
            error: (msg) => (console.error(`${chalk.red('Error')}: ${chalk.cyan(logPrefix)}: ${msg}`)),
            warn: (msg) => (console.warn(`${chalk.red('Warn')}: ${chalk.cyan(logPrefix)}: ${msg}`)),
            info: (msg) => (console.log(`${chalk.green('Info')}: ${chalk.cyan(logPrefix)}: ${msg}`)),
            verbose: (msg) => (console.log(`${chalk.blue('Verbose')}: ${chalk.cyan(logPrefix)}: ${msg}`)),
            debug: (msg) => (console.log(`${chalk.blueBright('Debug')}: ${chalk.cyan(logPrefix)}: ${msg}`)),
            silly: (msg) => (console.log(`${chalk.yellowBright('Silly')}: ${chalk.cyan(logPrefix)}: ${msg}`)),
        };
    }
}

module.exports = LogService;
