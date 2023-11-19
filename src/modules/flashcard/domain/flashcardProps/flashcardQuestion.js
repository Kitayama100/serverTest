"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlashcardQuestion = void 0;
const ValueObject_1 = require("../../../../shared/domain/ValueObject");
const Guard_1 = require("../../../../shared/core/Guard");
const Result_1 = require("../../../../shared/core/Result");
const UseCaseError_1 = require("../../../../shared/core/Response/UseCaseError");
class FlashcardQuestion extends ValueObject_1.ValueObject {
    get value() {
        return "TEXT:" + this.props.text + "IMAGE:" + this.props.image;
    }
    static create(props) {
        const textGuardResponse = Guard_1.Guard.againstNullOrUndefined(props.text, "FLASHCARD_QUESTION_TEXT");
        const imageGuardResponse = Guard_1.Guard.againstNullOrUndefined(props.image, "FLASHCARD_QUESTION_IMAGE");
        if (((props.text && props.text.trim().length === 0) || textGuardResponse.isLeft()) && ((props.image && props.image.trim().length === 0) || imageGuardResponse.isLeft())) {
            return (0, Result_1.left)(UseCaseError_1.CommonUseCaseResult.InvalidValue.create({
                errorMessage: `Both image and text are empty`,
                variable: "FLASHCARD_ANSWER",
                location: `${FlashcardQuestion.name}.${FlashcardQuestion.create.name}`
            }));
        }
        if (textGuardResponse.isLeft() && imageGuardResponse.isLeft()) {
            return (0, Result_1.left)(UseCaseError_1.CommonUseCaseResult.InvalidValue.create({
                errorMessage: `${textGuardResponse.value.error.errorMessage}`,
                variable: "FLASHCARD_QUESTION",
                location: `${FlashcardQuestion.name}.${FlashcardQuestion.create.name}`
            }));
        }
        return (0, Result_1.right)(new FlashcardQuestion({ text: props.text, image: props.image }));
    }
}
exports.FlashcardQuestion = FlashcardQuestion;
//# sourceMappingURL=flashcardQuestion.js.map