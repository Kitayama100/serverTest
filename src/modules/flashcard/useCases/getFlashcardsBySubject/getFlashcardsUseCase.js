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
exports.GetFlashcardsBySubjectUseCase = void 0;
const Guard_1 = require("../../../../shared/core/Guard");
const Result_1 = require("../../../../shared/core/Result");
class GetFlashcardsBySubjectUseCase {
    constructor(repo) {
        this.flashcardRepo = repo;
    }
    execute(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const GuardResponse = Guard_1.Guard.againstNullOrUndefined(props, "GETTING_FLASHCARDS_BY_SUBJECT");
            if (GuardResponse.isLeft()) {
                return (0, Result_1.left)(GuardResponse.value);
            }
            const flashcards = yield this.flashcardRepo.find_many({ subject_id: props });
            if (flashcards.isLeft()) {
                return (0, Result_1.left)(flashcards.value);
            }
            return (0, Result_1.right)(flashcards.value);
        });
    }
}
exports.GetFlashcardsBySubjectUseCase = GetFlashcardsBySubjectUseCase;
//# sourceMappingURL=getFlashcardsUseCase.js.map