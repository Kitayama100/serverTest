"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFlashcardUseCase = void 0;
const Flashcard_1 = require("../../domain/Flashcard");
const Result_1 = require("../../../../shared/core/Result");
const UseCaseError_1 = require("../../../../shared/core/Response/UseCaseError");
const flashcardAnswer_1 = require("../../domain/flashcardProps/flashcardAnswer");
const flashcardQuestion_1 = require("../../domain/flashcardProps/flashcardQuestion");
const flashcardDifficulty_1 = require("../../domain/flashcardProps/flashcardDifficulty");
const flashcardSubject_1 = require("../../domain/flashcardProps/flashcardSubject");
class CreateFlashcardUseCase {
    constructor(repo, subjectRepo) {
        this.flashcardRepo = repo;
        this.subjectRepo = subjectRepo;
    }
    execute(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const AnswerOrError = flashcardAnswer_1.FlashcardAnswer.create({ image: request.answer.image, text: request.answer.text });
            const QuestionOrError = flashcardQuestion_1.FlashcardQuestion.create({ image: request.question.image, text: request.question.text });
            const DifficultyOrError = flashcardDifficulty_1.FlashcardDifficulty.create({ value: request.difficulty });
            const Subject_idOrError = yield flashcardSubject_1.FlashcardSubject.create({ value: request.subject_id });
            // Either utils not working
            // const EitherUtilsResponse = EitherUtils.combine([QuestionOrError, DifficultyOrError, Subject_idOrError])
            // if (EitherUtilsResponse.isLeft()) {
            //     return left(EitherUtilsResponse.value)
            // }
            if (AnswerOrError.isLeft()) {
                return (0, Result_1.left)(AnswerOrError.value);
            }
            if (QuestionOrError.isLeft()) {
                return (0, Result_1.left)(QuestionOrError.value);
            }
            if (DifficultyOrError.isLeft()) {
                return (0, Result_1.left)(DifficultyOrError.value);
            }
            if (Subject_idOrError.isLeft()) {
                return (0, Result_1.left)(Subject_idOrError.value);
            }
            const Answer = AnswerOrError.value;
            const Question = QuestionOrError.value;
            const Difficulty = DifficultyOrError.value;
            const Subject_id = Subject_idOrError.value;
            // const id = new UniqueGlobalId().toValue()
            const FlashcardOrError = Flashcard_1.Flashcard.create({
                answer: Answer,
                question: Question,
                difficulty: Difficulty,
                subject_id: Subject_id
            });
            if (FlashcardOrError.isLeft()) {
                return (0, Result_1.left)(FlashcardOrError.value);
            }
            try {
                // return right(FlashcardOrError.value)
                const subjectResponse = yield this.subjectRepo.exists({ filter: { _id: Subject_id.value } });
                if (subjectResponse.isRight()) {
                    return (0, Result_1.left)(UseCaseError_1.CommonUseCaseResult.InvalidValue.create({
                        errorMessage: `A subject was not found with the specified ID: ${Subject_id.value}`,
                        location: `${CreateFlashcardUseCase.name}.SUBJECT_CHECK`,
                        variable: "SUBJECT_PARAMS"
                    }));
                }
                const newFlashcard = yield this.flashcardRepo.create({ dto: FlashcardOrError.value });
                if (newFlashcard.isLeft()) {
                    return (0, Result_1.left)(newFlashcard.value);
                }
                this.subjectRepo.activate({ _id: Subject_id.value });
                return (0, Result_1.right)(newFlashcard.value);
            }
            catch (error) {
                return (0, Result_1.left)(UseCaseError_1.CommonUseCaseResult.UnexpectedError.create(error));
            }
        });
    }
}
exports.CreateFlashcardUseCase = CreateFlashcardUseCase;
// async function testing() {
//     const test = new CreateFlashcardUseCase
//     const answer = await test.execute({answer : {text : "ASD", image : "ASD"}, question : {text : "  ", image : "  "}, subject_id : "sasdasd", difficulty : 2})
//     if (answer.isLeft()) {
//         console.log("ERRO")
//     } else {
//         console.log(FlashcardMap.toObject(answer.getRight()).value)
//         // console.log(answer.value.props.answer.props)
//     }
// }
// testing()
//# sourceMappingURL=CreateFlashcardUseCase.js.map