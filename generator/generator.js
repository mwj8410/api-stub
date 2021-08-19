const { pascalCase } = require('change-case');

const files = require('../lib/files');
const apiDefinition = require('../documentation/openApi');
const templates = require('./templates');

const lineFeed = '\n';
const routeHandlerPath = '/src/endpoints/generated/';

async function generate() {
// We need a list of paths with their corresponding handler defs
    const handlerConfigs = [];
    for (const [path, methods] of Object.entries(apiDefinition.paths)) {
        for (const [method, signature] of Object.entries(methods)) {
            handlerConfigs.push({path, method, signature});
        }
    }

    for (const handlerConfig of handlerConfigs) {
        const templateVariables = [
            {expression: /%name%/g, value: pascalCase(handlerConfig.signature.operationId) },
            {expression: /%httpMethod%/g, value: handlerConfig.method},
            {expression: /%httpPath%/g, value: handlerConfig.path}
        ];


        // Build from template
        let fileContent = '';

        fileContent += templates.jsDecorator + lineFeed;
        fileContent += templates.requireBlock + lineFeed;
        fileContent += templates.handlerClass + lineFeed;
        fileContent += templates.exportStatement + lineFeed;
        fileContent += templates.jsDecorator;

        for (const {expression, value} of templateVariables) {
            fileContent = fileContent.replace(expression, value);
        }

        // Write file
        const fileName = `${handlerConfig.signature.operationId}.handler.js`;
        await files.write(process.cwd() + routeHandlerPath, fileName, fileContent);
    }
}

generate()
    .then()
    .catch((err) => {
        console.error(err);
    });