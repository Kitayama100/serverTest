"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = exports.USER_ROLE = void 0;
const UseCaseError_1 = require("../../../../shared/core/Response/UseCaseError");
const Result_1 = require("../../../../shared/core/Result");
const ValueObject_1 = require("../../../../shared/domain/ValueObject");
var USER_ROLE;
(function (USER_ROLE) {
    USER_ROLE[USER_ROLE["dev"] = 0] = "dev";
    USER_ROLE[USER_ROLE["user"] = 1] = "user";
})(USER_ROLE || (exports.USER_ROLE = USER_ROLE = {}));
class UserRole extends ValueObject_1.ValueObject {
    get value() {
        return this.props.value;
    }
    static create(props) {
        const Response = Object.values(USER_ROLE).includes(props.value);
        if (!Response) {
            return (0, Result_1.left)(UseCaseError_1.CommonUseCaseResult.InvalidValue.create({
                errorMessage: `Invalid user role: ${props.value}`,
                variable: "USER_ROLE",
                location: `${UserRole.name}.${UserRole.create.name}`
            }));
        }
        return (0, Result_1.right)(new UserRole(props));
    }
}
exports.UserRole = UserRole;
//# sourceMappingURL=userRole.js.map