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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectRepo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Result_1 = require("../../../shared/core/Result");
const UseCaseError_1 = require("../../../shared/core/Response/UseCaseError");
const subjectMap_1 = require("../mappers/subjectMap");
class SubjectRepo {
    constructor(models) {
        this.models = models;
    }
    //although counter-intuitive, when the object does not exist it returns right(true)
    exists({ filter }) {
        return __awaiter(this, void 0, void 0, function* () {
            const subject_model = this.models.subject;
            try {
                if (filter._id && mongoose_1.default.Types.ObjectId.isValid(filter === null || filter === void 0 ? void 0 : filter._id) === false) {
                    return (0, Result_1.left)(UseCaseError_1.CommonUseCaseResult.InvalidValue.create({
                        errorMessage: `A subject was already found using these params: ${filter}`,
                        location: `${SubjectRepo.name}.${this.exists.name}`,
                        variable: "SUBJECT_PARAMS"
                    }));
                }
                const subject_response = yield subject_model.findById(filter._id);
                if (!subject_response) {
                    return (0, Result_1.right)(true);
                }
                else {
                    return (0, Result_1.left)(UseCaseError_1.CommonUseCaseResult.InvalidValue.create({
                        errorMessage: `A subject was already found using these params: ${filter}`,
                        location: `${SubjectRepo.name}.${this.exists.name}`,
                        variable: "SUBJECT_PARAMS"
                    }));
                }
            }
            catch (error) {
                return (0, Result_1.left)(UseCaseError_1.CommonUseCaseResult.UnexpectedError.create({
                    error
                }));
            }
        });
    }
    create(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const subject_model = this.models.subject;
            try {
                const Subject = subjectMap_1.SubjectMap.toObject(filter.dto);
                if (Subject.isLeft()) {
                    return (0, Result_1.left)(Subject.value);
                }
                const newSubject = yield subject_model.create(Subject.value);
                if (!newSubject) {
                    return (0, Result_1.left)(UseCaseError_1.CommonUseCaseResult.UnexpectedError.create({
                        errorMessage: `Unexpected error while creating flashcard: ${newSubject}`,
                        location: `${SubjectRepo.name}.${this.create.name}`,
                        variable: "FLASHCARD_REPO_CREATE_FLASHCARD"
                    }));
                }
                return (0, Result_1.right)(newSubject);
            }
            catch (error) {
                return (0, Result_1.left)(UseCaseError_1.CommonUseCaseResult.UnexpectedError.create(error));
            }
        });
    }
    find_many(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const subject_model = this.models.subject;
            try {
                const subjects = yield subject_model.find(filter.filter);
                return (0, Result_1.right)(subjects);
            }
            catch (error) {
                return (0, Result_1.left)(UseCaseError_1.CommonUseCaseResult.UnexpectedError.create(error));
            }
        });
    }
    activate(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const subject_model = this.models.subject;
            try {
                yield subject_model.findOneAndUpdate(filter, { active: true });
                return (0, Result_1.right)(true);
            }
            catch (error) {
                return (0, Result_1.left)(UseCaseError_1.CommonUseCaseResult.UnexpectedError.create(error));
            }
        });
    }
}
exports.SubjectRepo = SubjectRepo;
//# sourceMappingURL=subjectRepo.js.map