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
exports.UserEmail = void 0;
const UseCaseError_1 = require("../../../../shared/core/Response/UseCaseError");
const Result_1 = require("../../../../shared/core/Result");
const ValueObject_1 = require("../../../../shared/domain/ValueObject");
const userRepo_1 = require("../../repository/userRepo");
const mongoose_1 = require("mongoose");
class UserEmail extends ValueObject_1.ValueObject {
    get value() {
        return this.props.value;
    }
    static create(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const ValidEmail = props.value.trim().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            const AlreadyExists = yield (new userRepo_1.UserRepo(mongoose_1.models)).exists({ filter: { email: props.value } });
            if (!ValidEmail) {
                return (0, Result_1.left)(UseCaseError_1.CommonUseCaseResult.InvalidValue.create({
                    errorMessage: `The value sent is not a valid email: ${props.value}`,
                    variable: "USER_EMAIL",
                    location: `${UserEmail.name}.${UserEmail.create.name}`
                }));
            }
            if (AlreadyExists.isLeft()) {
                return (0, Result_1.left)(UseCaseError_1.CommonUseCaseResult.InvalidValue.create({
                    errorMessage: `${AlreadyExists.value.error.errorMessage}`,
                    variable: "USER_EMAIL_ALREADY_EXISTS",
                    location: `${UserEmail.name}.${UserEmail.create.name}`
                }));
            }
            return (0, Result_1.right)(new UserEmail(props));
        });
    }
}
exports.UserEmail = UserEmail;
//# sourceMappingURL=userEmail.js.map