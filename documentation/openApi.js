const FieldDefinition = {
    uuid: {
        type: 'string',
        format: 'uuid'
    }
};

module.exports = {
    openapi: '3.0.1',
    info: {
        version: '1.3.0',
        title: 'ApiStub',
        description: 'Stub functionality for an API',
        termsOfService: '',
        contact: {
            name: 'Matthew Jackson',
            email: 'mwj8410@gmail.com',
            url: ''
        },
        license: {
            name: 'Apache 2.0',
            url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
        }
    },

    components: {
        schemas: {
            // Simple Types
            OrganizationId: FieldDefinition.uuid,

            // Response Payloads
            HealthCheckResponse: {
                type: 'object',
                properties: {
                    ok: {
                        type: 'boolean',
                        description: 'Indicates the service\'s health'
                    }
                }
            },

            // Entity Types
            ErrorResponse: {
                type: 'object',
                properties: {
                    code: {
                        type: 'string'
                    },
                    description: {
                        type: 'string'
                    }
                }
            },

            User: {
                type: 'object',
                properties: {
                    id: FieldDefinition.uuid,
                    name: { type: 'string' }
                },
                required: [ 'name' ],
                example: {
                    name: 'Puma',
                    id: 1
                }
            }
        }
    },

    paths: {
        '/healthCheck': {
            get: {
                tags: ['Service Operations'],
                description: 'Provides an indication that the service is healthy and ready for traffic',
                operationId: 'healthCheck',
                parameters: {

                },
                responses: {
                    '200': {
                        description: 'Service is healthy',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/HealthCheckResponse'
                                }
                            }
                        }
                    }
                }
            }
        },
        '/user/:id': {
            get: {
                tags: ['CRUD Operations'],
                description: 'Get user',
                operationId: 'getUsers',
                parameters: [
                    {
                        name: 'x-organization-id',
                        in: 'header',
                        schema: {
                            $ref: '#/components/schemas/OrganizationId'
                        },
                        required: true,
                        description: 'Company id where the users work'
                    },
                    {
                        name: 'page',
                        in: 'query',
                        schema: {
                            type: 'integer',
                            default: 1
                        },
                        required: false
                    }
                ],
                responses: {
                    '200': {
                        description: 'Users were obtained',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/User'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/ErrorResponse'
                                },
                                example: {
                                    message: 'companyId is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};