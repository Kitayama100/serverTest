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
exports.CreateSubjectUseCase = void 0;
const Subject_1 = require("../../domain/Subject");
const subjectName_1 = require("../../domain/subjectProps/subjectName");
const Result_1 = require("../../../../shared/core/Result");
const UseCaseError_1 = require("../../../../shared/core/Response/UseCaseError");
class CreateSubjectUseCase {
    constructor(repo) {
        this.subjectRepo = repo;
    }
    execute(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const NameOrError = subjectName_1.SubjectName.create({ value: props.name });
            if (NameOrError.isLeft()) {
                return (0, Result_1.left)(NameOrError.value);
            }
            const SubjectOrError = Subject_1.Subject.create({ name: NameOrError.value });
            if (SubjectOrError.isLeft()) {
                return (0, Result_1.left)(SubjectOrError.value);
            }
            try {
                const newSubject = yield this.subjectRepo.create({ dto: SubjectOrError.value });
                if (newSubject.isLeft()) {
                    return (0, Result_1.left)(newSubject.value);
                }
                return (0, Result_1.right)(newSubject.value);
            }
            catch (error) {
                return (0, Result_1.left)(UseCaseError_1.CommonUseCaseResult.UnexpectedError.create(error));
            }
        });
    }
}
exports.CreateSubjectUseCase = CreateSubjectUseCase;
//# sourceMappingURL=createSubjectUseCase.js.map