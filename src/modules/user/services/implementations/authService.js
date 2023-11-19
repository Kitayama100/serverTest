"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const UseCaseError_1 = require("../../../../shared/core/Response/UseCaseError");
const Result_1 = require("../../../../shared/core/Result");
class AuthService {
    constructor(key) {
        this.saltedRounds = 10;
        this.key = key;
    }
    signJWT(props) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, jsonwebtoken_1.sign)(props, this.key);
        });
    }
    decodeJWT(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decodedJWT = (0, jsonwebtoken_1.verify)(token, this.key);
                return (0, Result_1.right)(decodedJWT);
            }
            catch (error) {
                return (0, Result_1.left)(UseCaseError_1.CommonUseCaseResult.UnexpectedError.create(error));
            }
        });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=authService.js.map