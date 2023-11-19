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
exports.Middleware = void 0;
const bcrypt = require("bcrypt");
const secretsManager_1 = require("../../../../config/secretsManager");
const Guard_1 = require("../../../core/Guard");
const authService_1 = require("../../../../modules/user/services/implementations/authService");
class Middleware {
    static authenticate() {
        return ((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
            const GuardResponse = Guard_1.Guard.againstNullOrUndefined(token, "TOKEN");
            if (GuardResponse.isLeft() || !token) {
                return res.status(401).send(GuardResponse);
            }
            const decoded = yield new authService_1.AuthService(secretsManager_1.Secrets.getSecret("SECRET_KEY")).decodeJWT(token);
            if (decoded.isRight()) {
                if (decoded.value.role === 0) {
                    return res.status(401).send("Unauthorized account");
                }
                return next();
            }
            else {
                return res.status(401).send(decoded.value);
            }
        }));
    }
}
exports.Middleware = Middleware;
// export class Middleware extends BaseController<Request> {
//     constructor(req : Request, res : Response, next : NextFunction) {
//         super()
//         const token = req.headers.authorization?.split(' ')[1]
//         if (!token) {
//             this.errorHandler(res, CommonUseCaseResult.InvalidValue.create({
//                 errorMessage: "Request is missing bearer token",
//                 variable: "USER_TOKEN",
//                 location: `${Middleware.name}`
//             }))
//         }
//         try{
//         const TokenOrError = verify(token as string, Secrets.getSecret("SECRET_KEY")) as JWTDTO
//         if (TokenOrError.role === 1) {
//             next()
//         }
//         this.errorHandler(res, CommonUseCaseResult.Conflict.create({
//             errorMessage: "User does not have permission to execute this request",
//                 variable: "USER_TOKEN",
//                 location: `${Middleware.name}`
//             }))
//     }catch (err) {
//         this.fail(res, err as Error)
//     }
// }
// }
// export async function middleware(req : Request, res : Response, next : NextFunction)  {
//     const token = req.headers.authorization?.split(' ')[1]
//     if (!token) {
//         return CommonUseCaseResult.InvalidValue.create({
//             errorMessage: "Request is missing bearer token",
//             variable: "USER_TOKEN",
//             location: `${middleware.name}`
//         })
//     }
//     try {
//         const TokenOrError = verify(token, Secrets.getSecret("SECRET_KEY")) as JWTDTO
//         if (TokenOrError.role === 1) {
//             next()
//         }
//         return CommonUseCaseResult.Conflict.create({
//             // create error
//         })
//     }catch (err) {
//         return CommonUseCaseResult.UnexpectedError.create(err)
//     }
// }
//# sourceMappingURL=middleware.js.map