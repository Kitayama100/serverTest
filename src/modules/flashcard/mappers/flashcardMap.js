"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlashcardMap = void 0;
const UseCaseError_1 = require("../../../shared/core/Response/UseCaseError");
const Result_1 = require("../../../shared/core/Result");
class FlashcardMap {
    static toObject(flashcard) {
        try {
            // answer.value.props.answer.props)
            return (0, Result_1.right)({
                _id: flashcard.flashcardId.toValue(),
                answer: flashcard.answer.props,
                difficulty: flashcard.difficulty.value,
                question: flashcard.question.props,
                subject_id: flashcard.subject_id.value,
            });
        }
        catch (error) {
            return (0, Result_1.left)(UseCaseError_1.CommonUseCaseResult.UnexpectedError.create(error));
        }
    }
}
exports.FlashcardMap = FlashcardMap;
//# sourceMappingURL=flashcardMap.js.map