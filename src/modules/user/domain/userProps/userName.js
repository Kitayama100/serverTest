"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Username = void 0;
const Guard_1 = require("../../../../shared/core/Guard");
const UseCaseError_1 = require("../../../../shared/core/Response/UseCaseError");
const Result_1 = require("../../../../shared/core/Result");
const ValueObject_1 = require("../../../../shared/domain/ValueObject");
class Username extends ValueObject_1.ValueObject {
    get value() {
        return this.props.value;
    }
    static create(props) {
        const GuardResponse = Guard_1.Guard.againstNullOrUndefined(props.value.trim(), "USERNAME");
        const GuardLengthResponse = Guard_1.Guard.againstAtMost(24, props.value.trim());
        if (GuardResponse.isLeft()) {
            return (0, Result_1.left)(UseCaseError_1.CommonUseCaseResult.InvalidValue.create({
                errorMessage: `${GuardResponse.value.error.errorMessage}`,
                variable: "USERNAME",
                location: `${Username.name}.${Username.create.name}`
            }));
        }
        if (GuardLengthResponse.isLeft()) {
            return (0, Result_1.left)(UseCaseError_1.CommonUseCaseResult.InvalidValue.create({
                errorMessage: `${GuardLengthResponse.value.error.errorMessage}`,
                variable: "USERNAME",
                location: `${Username.name}.${Username.create.name}`
            }));
        }
        return (0, Result_1.right)(new Username(props));
    }
}
exports.Username = Username;
//# sourceMappingURL=userName.js.map