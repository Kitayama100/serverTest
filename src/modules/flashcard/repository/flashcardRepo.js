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
exports.FlashcardRepo = void 0;
const UseCaseError_1 = require("../../../shared/core/Response/UseCaseError");
const Result_1 = require("../../../shared/core/Result");
const flashcardMap_1 = require("../mappers/flashcardMap");
class FlashcardRepo {
    constructor(models) {
        this.models = models;
    }
    create(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const FlashcardModel = this.models.flashcard;
            try {
                // props._id = new UniqueGlobalId().toValue()
                // props or props.dto
                const flashcardObject = flashcardMap_1.FlashcardMap.toObject(props.dto);
                const newFlashcard = yield FlashcardModel.create(flashcardObject.value);
                if (!newFlashcard) {
                    return (0, Result_1.left)(UseCaseError_1.CommonUseCaseResult.UnexpectedError.create({
                        errorMessage: `Unexpected error while creating flashcard: ${newFlashcard}`,
                        location: `${FlashcardRepo.name}.${this.create.name}`,
                        variable: "FLASHCARD_REPO_CREATE_FLASHCARD"
                    }));
                }
                return (0, Result_1.right)(newFlashcard);
            }
            catch (error) {
                return (0, Result_1.left)(UseCaseError_1.CommonUseCaseResult.UnexpectedError.create({ error }));
            }
        });
    }
    find_one(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const FlashcardModel = this.models.flashcard;
            try {
                const flashcard = yield FlashcardModel.findById(props.id);
                if (!flashcard) {
                    return (0, Result_1.left)(UseCaseError_1.CommonUseCaseResult.InvalidValue.create({
                        errorMessage: `Flashcard id value is invalid: ${props.id}`,
                        location: `${FlashcardRepo.name}.${this.create.name}`,
                        variable: "FLASHCARD_REPO_FIND_FLASHCARD"
                    }));
                }
                return (0, Result_1.right)(flashcard);
            }
            catch (error) {
                return (0, Result_1.left)(UseCaseError_1.CommonUseCaseResult.UnexpectedError.create({ error }));
            }
        });
    }
    find_many(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const FlashcardModel = this.models.flashcard;
            try {
                const flashcards = yield FlashcardModel.find(props);
                if (!flashcards) {
                    return (0, Result_1.left)(UseCaseError_1.CommonUseCaseResult.InvalidValue.create({
                        errorMessage: `Subject id is invalid  ${props.subject_id}`,
                        location: `${FlashcardRepo.name}.${this.create.name}`,
                        variable: "FLASHCARD_REPO_FIND_FLASHCARDS_BY_SUBJECT"
                    }));
                }
                return (0, Result_1.right)(flashcards);
            }
            catch (error) {
                return (0, Result_1.left)(UseCaseError_1.CommonUseCaseResult.UnexpectedError.create(error));
            }
        });
    }
}
exports.FlashcardRepo = FlashcardRepo;
//# sourceMappingURL=flashcardRepo.js.map