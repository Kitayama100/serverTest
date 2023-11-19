"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectRouter = void 0;
const express_1 = __importDefault(require("express"));
const subjectRepo_1 = require("../../repository/subjectRepo");
const createSubjectController_1 = require("../../useCases/createSubjectUseCase/createSubjectController");
const createSubjectUseCase_1 = require("../../useCases/createSubjectUseCase/createSubjectUseCase");
const getFlashcardsController_1 = require("../../../flashcard/useCases/getFlashcardsBySubject/getFlashcardsController");
const mongoose_1 = require("mongoose");
const getFlashcardsUseCase_1 = require("../../../flashcard/useCases/getFlashcardsBySubject/getFlashcardsUseCase");
const flashcardRepo_1 = require("../../../flashcard/repository/flashcardRepo");
const middleware_1 = require("../../../../shared/infra/http/utils/middleware");
const getSubjectsController_1 = require("../../useCases/getSubjectsUseCase/getSubjectsController");
const getSubjectsUseCase_1 = require("../../useCases/getSubjectsUseCase/getSubjectsUseCase");
const getSubjectsContainingFlashcardsUseCase_1 = require("../../useCases/getSubjectsContainingFlashcards/getSubjectsContainingFlashcardsUseCase");
const getSubjectsContainingFlashcardsController_1 = require("../../useCases/getSubjectsContainingFlashcards/getSubjectsContainingFlashcardsController");
const SubjectRouter = express_1.default.Router();
exports.SubjectRouter = SubjectRouter;
SubjectRouter.post("/create", middleware_1.Middleware.authenticate(), (req, res, next) => { (new createSubjectController_1.CreateSubjectController(new createSubjectUseCase_1.CreateSubjectUseCase(new subjectRepo_1.SubjectRepo(mongoose_1.models)))).execute(req, res); });
SubjectRouter.get("/:id/flashcards", (req, res) => { new getFlashcardsController_1.GetFlashcardsController(new getFlashcardsUseCase_1.GetFlashcardsBySubjectUseCase(new flashcardRepo_1.FlashcardRepo(mongoose_1.models))).execute(req, res); });
SubjectRouter.get("/all", (req, res) => { new getSubjectsController_1.GetSubjectsController(new getSubjectsUseCase_1.GetSubjectsUseCase(new subjectRepo_1.SubjectRepo(mongoose_1.models))).execute(req, res); });
SubjectRouter.get("/active/all", (req, res) => { new getSubjectsContainingFlashcardsController_1.GetSubjectsContainingFlashcardsController(new getSubjectsContainingFlashcardsUseCase_1.GetSubjectsContainingFlashcardsUseCase(new subjectRepo_1.SubjectRepo(mongoose_1.models), new flashcardRepo_1.FlashcardRepo(mongoose_1.models))).execute(req, res); });
//# sourceMappingURL=subject.js.map