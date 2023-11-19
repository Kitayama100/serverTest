"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flashcardRouter = void 0;
const express_1 = __importDefault(require("express"));
const CreateFlashcardController_1 = require("../../useCases/createFlashcard/CreateFlashcardController");
const CreateFlashcardUseCase_1 = require("../../useCases/createFlashcard/CreateFlashcardUseCase");
const mongoose_1 = require("mongoose");
const flashcardRepo_1 = require("../../repository/flashcardRepo");
const middleware_1 = require("../../../../shared/infra/http/utils/middleware");
const subjectRepo_1 = require("../../../subject/repository/subjectRepo");
const flashcardRouter = express_1.default.Router();
exports.flashcardRouter = flashcardRouter;
flashcardRouter.post('/create', middleware_1.Middleware.authenticate(), (req, res) => { (new CreateFlashcardController_1.CreateFlashcardController(new CreateFlashcardUseCase_1.CreateFlashcardUseCase(new flashcardRepo_1.FlashcardRepo(mongoose_1.models), new subjectRepo_1.SubjectRepo(mongoose_1.models)))).execute(req, res); });
//# sourceMappingURL=flashcard.js.map