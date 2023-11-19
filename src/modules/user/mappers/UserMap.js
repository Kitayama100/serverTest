"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMap = void 0;
const UseCaseError_1 = require("../../../shared/core/Response/UseCaseError");
const Result_1 = require("../../../shared/core/Result");
class UserMap {
    static toObject(props) {
        try {
            const UserObject = {
                _id: props.userId.toValue(),
                email: props.props.email.value,
                password: props.props.password.value,
                name: props.props.name.value,
                role: 1
            };
            return (0, Result_1.right)(UserObject);
        }
        catch (error) {
            return (0, Result_1.left)(UseCaseError_1.CommonUseCaseResult.UnexpectedError.create(error));
        }
    }
}
exports.UserMap = UserMap;
//# sourceMappingURL=UserMap.js.map