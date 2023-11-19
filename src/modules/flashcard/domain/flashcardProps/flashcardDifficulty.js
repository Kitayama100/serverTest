"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlashcardDifficulty = exports.FLASHCARD_DIFFICULTY = void 0;
const UseCaseError_1 = require("../../../../shared/core/Response/UseCaseError");
const Result_1 = require("../../../../shared/core/Result");
const ValueObject_1 = require("../../../../shared/domain/ValueObject");
var FLASHCARD_DIFFICULTY;
(function (FLASHCARD_DIFFICULTY) {
    FLASHCARD_DIFFICULTY[FLASHCARD_DIFFICULTY["easy"] = 0] = "easy";
    FLASHCARD_DIFFICULTY[FLASHCARD_DIFFICULTY["medium"] = 1] = "medium";
    FLASHCARD_DIFFICULTY[FLASHCARD_DIFFICULTY["hard"] = 2] = "hard";
})(FLASHCARD_DIFFICULTY || (exports.FLASHCARD_DIFFICULTY = FLASHCARD_DIFFICULTY = {}));
class FlashcardDifficulty extends ValueObject_1.ValueObject {
    get value() {
        return this.props.value;
    }
    static create(props) {
        if (Object.values(FLASHCARD_DIFFICULTY).includes(props.value)) {
            return (0, Result_1.right)(new FlashcardDifficulty(props));
        }
        return (0, Result_1.left)(UseCaseError_1.CommonUseCaseResult.InvalidValue.create({
            errorMessage: `Invalid difficulty number: ${props.value}`,
            location: `${FlashcardDifficulty.name}.${this.create.name}`,
            variable: "FLASHCARD_DIFFICULTY"
        }));
    }
}
exports.FlashcardDifficulty = FlashcardDifficulty;
// const test = FlashcardDifficulty.create({value : 1})
//# sourceMappingURL=flashcardDifficulty.js.map