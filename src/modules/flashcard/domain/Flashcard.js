"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flashcard = void 0;
const Guard_1 = require("../../../shared/core/Guard");
const Result_1 = require("../../../shared/core/Result");
const Entity_1 = require("../../../shared/domain/Entity");
const UniqueGlobalID_1 = require("../../../shared/domain/UniqueGlobalID");
class Flashcard extends Entity_1.Entity {
    // private constructor (props : IFlashcardProps, id : UniqueGlobalId) {
    //     super(props, id)
    // }
    get flashcardId() {
        return new UniqueGlobalID_1.UniqueGlobalId();
    }
    get question() {
        return this.props.question;
    }
    get answer() {
        return this.props.answer;
    }
    get difficulty() {
        return this.props.difficulty;
    }
    get subject_id() {
        return this.props.subject_id;
    }
    static create(props, id) {
        // shouldnt it be props.question.value?
        const GuardResponse = Guard_1.Guard.againstNullOrUndefinedBulk([
            { argument: props.question, argumentName: "FLASHCARD_QUESTION" },
            { argument: props.answer, argumentName: "FLASHCARD_ANSWER" },
            { argument: props.difficulty, argumentName: "FLASHCARD_DIFFICULTY" },
            { argument: props.subject_id, argumentName: "FLASHCARD_SUBJECT" }
        ]);
        if (GuardResponse.isLeft()) {
            return (0, Result_1.left)(GuardResponse.value);
        }
        // why ID
        // const flashcard = new Flashcard(props, id)
        const flashcard = new Flashcard(Object.assign({}, props), id);
        return (0, Result_1.right)(flashcard);
    }
}
exports.Flashcard = Flashcard;
//# sourceMappingURL=Flashcard.js.map