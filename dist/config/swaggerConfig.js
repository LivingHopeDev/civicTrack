"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const port = process.env.PORT;
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "CivicTrack API",
        version: "1.0.0",
        description: "API Documentation",
    },
    servers: [
        {
            url: `http://localhost:${port}/api/v1`,
            description: "Local Development Server",
        },
        {
            url: `https://civictrack.onrender.com/api/v1`,
            description: "Production Server",
        },
    ],
    tags: [
        {
            name: "default",
            description: "A list of all default routes",
        },
        {
            name: "Authentication",
            description: "A list of routes for Authentication",
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
};
const options = {
    swaggerDefinition,
    apis: ["./src/docs/**/*.ts"],
};
const swaggerDoc = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerDoc;
