"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const secretsManager_1 = require("../../../config/secretsManager");
const authService_1 = require("./implementations/authService");
const authService = new authService_1.AuthService(secretsManager_1.Secrets.getSecret("SECRET_KEY"));
exports.authService = authService;
//# sourceMappingURL=index.js.map