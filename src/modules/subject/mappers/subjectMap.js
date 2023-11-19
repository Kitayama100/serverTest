"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectMap = void 0;
const UseCaseError_1 = require("../../../shared/core/Response/UseCaseError");
const Result_1 = require("../../../shared/core/Result");
class SubjectMap {
    static toObject(props) {
        try {
            const SubjectObject = {
                name: props.props.name.value,
                _id: props.subjectId.toValue(),
                active: false
            };
            return (0, Result_1.right)(SubjectObject);
        }
        catch (error) {
            return (0, Result_1.left)(UseCaseError_1.CommonUseCaseResult.UnexpectedError.create(error));
        }
    }
}
exports.SubjectMap = SubjectMap;
//# sourceMappingURL=subjectMap.js.map