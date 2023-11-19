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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Secrets = void 0;
const Guard_1 = require("../shared/core/Guard");
const dotenv = __importStar(require("dotenv"));
class Secrets {
    constructor(env) {
        dotenv.config({
            path: (__dirname + "../../.env")
        });
    }
    static getSecret(secret) {
        if (!this.instance) {
            this.instance = new Secrets(process.env.NODE_ENV);
        }
        const result = Guard_1.Guard.againstNullOrUndefined(process.env[secret], `Environment variable ${secret}`);
        if (result.isRight())
            return process.env[secret];
        // console.log(result.value, 'asd')
        throw new Error(`Unknow enviroment variable ${secret}`);
    }
    static get NODE_ENV() {
        return process.env.NODE_ENV;
    }
}
exports.Secrets = Secrets;
//# sourceMappingURL=secretsManager.js.map