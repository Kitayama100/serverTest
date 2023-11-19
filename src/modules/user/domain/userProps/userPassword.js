"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPassword = void 0;
const Guard_1 = require("../../../../shared/core/Guard");
const UseCaseError_1 = require("../../../../shared/core/Response/UseCaseError");
const Result_1 = require("../../../../shared/core/Result");
const ValueObject_1 = require("../../../../shared/domain/ValueObject");
class UserPassword extends ValueObject_1.ValueObject {
    get value() {
        return this.props.value;
    }
    static create(props) {
        const GuardResponse = Guard_1.Guard.againstNullOrUndefined(props.value, "USER_PASSWORD");
        if (GuardResponse.isLeft()) {
            return (0, Result_1.left)(UseCaseError_1.CommonUseCaseResult.InvalidValue.create({
                errorMessage: `${GuardResponse.value.error.errorMessage}`,
                variable: "USER_PASSWORD",
                location: `${UserPassword.name}.${UserPassword.create.name}`
            }));
        }
        return (0, Result_1.right)(new UserPassword(props));
    }
}
exports.UserPassword = UserPassword;
//# sourceMappingURL=userPassword.js.map