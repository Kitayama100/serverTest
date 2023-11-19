"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.v1Router = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../../../modules/user/domain/routes/auth");
const flashcard_1 = require("../../../../modules/flashcard/domain/routes/flashcard");
const subject_1 = require("../../../../modules/subject/domain/routes/subject");
const v1Router = express_1.default.Router();
exports.v1Router = v1Router;
v1Router.use("/auth", auth_1.authRouter);
v1Router.use("/flashcard", flashcard_1.flashcardRouter);
v1Router.use("/subject", subject_1.SubjectRouter);
//# sourceMappingURL=v1.js.map