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
exports.LoginUseCase = void 0;
const Guard_1 = require("../../../../shared/core/Guard");
const Result_1 = require("../../../../shared/core/Result");
const UseCaseError_1 = require("../../../../shared/core/Response/UseCaseError");
const services_1 = require("../../services");
const jwt_1 = require("../../domain/jwt");
const bcrypt = require("bcrypt");
class LoginUseCase {
    constructor(props) {
        this.userRepo = props;
    }
    execute(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const GuardResponse = Guard_1.Guard.againstNullOrUndefinedBulk([{ argument: props.email, argumentName: "EMAIL" }, { argument: props.password, argumentName: "PASSWORD" }]);
            if (GuardResponse.isLeft()) {
                return (0, Result_1.left)(GuardResponse.value);
            }
            try {
                const userOrError = yield this.userRepo.find_one({ filter: { email: props.email } });
                if (userOrError.isLeft()) {
                    return (0, Result_1.left)(userOrError.value);
                }
                const user = userOrError.value;
                const passwordCompare = bcrypt.compare(user.password, props.password);
                if (passwordCompare === false) {
                    return (0, Result_1.left)(UseCaseError_1.CommonUseCaseResult.InvalidValue.create({
                        errorMessage: `Password does not match account`,
                        variable: "PASSWORD",
                        location: `LoginUseCase PasswordVerification`
                    }));
                }
                const token = yield services_1.authService.signJWT({
                    email: user.email,
                    uid: user._id,
                    role: user.role,
                    token_function: jwt_1.TokenFunctions.authenticateUser,
                    name: user.name
                });
                return (0, Result_1.right)({
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                    role: user.role,
                    token: token
                });
            }
            catch (error) {
                return (0, Result_1.left)(UseCaseError_1.CommonUseCaseResult.UnexpectedError.create(error));
            }
        });
    }
}
exports.LoginUseCase = LoginUseCase;
//# sourceMappingURL=loginUseCase.js.map