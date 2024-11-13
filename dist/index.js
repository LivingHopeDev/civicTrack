"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = void 0;
const express_1 = __importStar(require("express"));
const routes_1 = __importDefault(require("./routes"));
const client_1 = require("@prisma/client");
const middlewares_1 = require("./middlewares");
const config_1 = __importDefault(require("./config"));
const swagger_ui_express_1 = require("swagger-ui-express");
const swaggerConfig_1 = __importDefault(require("./config/swaggerConfig"));
const logger_1 = __importDefault(require("./utils/logger"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, express_1.urlencoded)({ extended: false }));
app.use((0, cors_1.default)());
app.use("/api/v1", routes_1.default);
app.use("/api/docs", swagger_ui_express_1.serve, (0, swagger_ui_express_1.setup)(swaggerConfig_1.default));
app.get("/api/v1", (req, res) => {
    res.json({
        status: "Success",
        message: "Welcome: I will responding to your requests",
    });
});
exports.prismaClient = new client_1.PrismaClient({
    log: ["query"],
});
app.use(middlewares_1.routeNotFound);
app.use(middlewares_1.errorHandler);
app.listen(config_1.default.port, () => {
    logger_1.default.info(`Server running on port ${config_1.default.port}`);
});
exports.default = app;
