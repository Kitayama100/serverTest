"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const v1_1 = require("./api/v1");
const body_parser_1 = __importDefault(require("body-parser"));
const connect_1 = require("../config/connect");
const secretsManager_1 = require("../../../config/secretsManager");
const cors = require("cors");
const app = (0, express_1.default)();
(0, connect_1.connect)();
app.use(cors());
app.use(body_parser_1.default.urlencoded());
app.use(body_parser_1.default.json());
app.use("/", v1_1.v1Router);
app.use;
console.log(app.route);
const port = secretsManager_1.Secrets.getSecret("PORT");
app.listen(port, () => {
    console.log(`[App]: Listening on port ${port}`);
});
//# sourceMappingURL=app.js.map