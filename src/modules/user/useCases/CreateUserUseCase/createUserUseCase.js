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
exports.CreateUserUseCase = void 0;
const userEmail_1 = require("../../domain/userProps/userEmail");
const userPassword_1 = require("../../domain/userProps/userPassword");
const userRole_1 = require("../../domain/userProps/userRole");
const userName_1 = require("../../domain/userProps/userName");
const User_1 = require("../../domain/User");
const Result_1 = require("../../../../shared/core/Result");
const UseCaseError_1 = require("../../../../shared/core/Response/UseCaseError");
// TODO check if user is dev to create another dev
class CreateUserUseCase {
    constructor(props) {
        this.userRepo = props;
    }
    execute(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const EmailOrError = yield userEmail_1.UserEmail.create({ value: props.email.trim() });
            const PasswordOrError = userPassword_1.UserPassword.create({ value: props.password.trim() });
            const RoleOrError = userRole_1.UserRole.create({ value: 0 });
            const UsernameOrError = userName_1.Username.create({ value: props.name.trim() });
            // const response = EitherUtils.combine([EmailOrError, PasswordOrError, RoleOrError, UsernameOrError])
            if (EmailOrError.isLeft()) {
                return (0, Result_1.left)(EmailOrError.value);
            }
            if (PasswordOrError.isLeft()) {
                return (0, Result_1.left)(PasswordOrError.value);
            }
            if (RoleOrError.isLeft()) {
                return (0, Result_1.left)(RoleOrError.value);
            }
            if (UsernameOrError.isLeft()) {
                return (0, Result_1.left)(UsernameOrError.value);
            }
            // if (response.isLeft()) {
            //     return left(response.value)
            // }
            const UserOrError = User_1.User.create({
                email: EmailOrError.value,
                password: PasswordOrError.value,
                role: RoleOrError.value,
                name: UsernameOrError.value
            });
            if (UserOrError.isLeft()) {
                return (0, Result_1.left)(UserOrError.value);
            }
            try {
                const NewUser = yield this.userRepo.create({ dto: UserOrError.value });
                if (NewUser.isLeft()) {
                    return (0, Result_1.left)(NewUser.value);
                }
                return (0, Result_1.right)(NewUser.value);
            }
            catch (error) {
                return (0, Result_1.left)(UseCaseError_1.CommonUseCaseResult.UnexpectedError.create(error));
            }
        });
    }
}
exports.CreateUserUseCase = CreateUserUseCase;
//# sourceMappingURL=createUserUseCase.js.map