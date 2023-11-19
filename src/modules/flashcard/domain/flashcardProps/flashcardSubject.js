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
exports.FlashcardSubject = void 0;
const mongoose_1 = require("mongoose");
const Guard_1 = require("../../../../shared/core/Guard");
const UseCaseError_1 = require("../../../../shared/core/Response/UseCaseError");
const Result_1 = require("../../../../shared/core/Result");
const ValueObject_1 = require("../../../../shared/domain/ValueObject");
const subjectRepo_1 = require("../../../subject/repository/subjectRepo");
class FlashcardSubject extends ValueObject_1.ValueObject {
    get value() {
        return this.props.value;
    }
    // needs async?
    static create(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const GuardResponse = Guard_1.Guard.againstNullOrUndefined(props.value, "FLASHCARD_SUBJECT");
            const AlreadyExists = yield (new subjectRepo_1.SubjectRepo(mongoose_1.models)).exists({ filter: { _id: props.value } });
            if (AlreadyExists.isRight()) {
                return (0, Result_1.left)(UseCaseError_1.CommonUseCaseResult.InvalidValue.create({
                    errorMessage: `A subject was not found using the params: ${props}`,
                    variable: "FLASHCARD_QUESTION",
                    location: `${FlashcardSubject.name}.${FlashcardSubject.create.name}`
                }));
            }
            if (GuardResponse.isLeft()) {
                return (0, Result_1.left)(UseCaseError_1.CommonUseCaseResult.InvalidValue.create({
                    errorMessage: `${GuardResponse.value.error.errorMessage}`,
                    variable: "FLASHCARD_QUESTION",
                    location: `${FlashcardSubject.name}.${FlashcardSubject.create.name}`
                }));
            }
            return (0, Result_1.right)(new FlashcardSubject(props));
        });
    }
}
exports.FlashcardSubject = FlashcardSubject;
//# sourceMappingURL=flashcardSubject.js.map