"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectName = void 0;
const Guard_1 = require("../../../../shared/core/Guard");
const UseCaseError_1 = require("../../../../shared/core/Response/UseCaseError");
const Result_1 = require("../../../../shared/core/Result");
const ValueObject_1 = require("../../../../shared/domain/ValueObject");
class SubjectName extends ValueObject_1.ValueObject {
    get value() {
        return this.props.value;
    }
    static create(props) {
        const GuardResponse = Guard_1.Guard.againstNullOrUndefined(props.value.trim(), "SUBJECT_NAME");
        if (GuardResponse.isLeft()) {
            return (0, Result_1.left)(UseCaseError_1.CommonUseCaseResult.InvalidValue.create({
                errorMessage: `${GuardResponse.value.error.errorMessage}`,
                variable: "FLASHCARD_QUESTION",
                location: `${SubjectName.name}.${SubjectName.create.name}`
            }));
        }
        console.log('asddddd');
        return (0, Result_1.right)(new SubjectName(props));
    }
}
exports.SubjectName = SubjectName;
//# sourceMappingURL=subjectName.js.map