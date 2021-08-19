const env_vars = [
    'LOGLEVEL',

    'HOST_HTTP_PORT'
];

const { NODE_ENV } = process.env;

// Validate that the environment is complete
let error = false;
env_vars.forEach((variable) => {
    if (typeof process.env[variable] === 'undefined') {
        console.error('Failed to bootstrap non production environment.');
        console.warn(`Missing environment variable '${variable}'!`);
        console.warn(`Configured environment is '${NODE_ENV}'.`);
        console.warn('Check the Docker Compose file if \'production\' or \'ci\'');
        console.warn(`Check the './env/${NODE_ENV}.env' otherwise`);
        error = true;
    }
});

if (error) {
    process.exit();
}

module.exports = {
    app: {
        logLevel: process.env.LOGLEVEL,
        isProd: NODE_ENV === 'production'
    },

    host: {
        httpPort: process.env.HOST_HTTP_PORT
    }
};
