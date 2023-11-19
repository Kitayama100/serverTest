"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// TODO fix flashcard question, text and image
const FlashcardSchema = new mongoose_1.default.Schema({
    question: { type: Object, required: false },
    answer: { type: Object, required: true },
    subject_id: { type: mongoose_1.default.Types.ObjectId, required: true },
    difficulty: { type: Number, required: false, default: 0 } // 0 - easy, 1 - medium, 2 - hard
});
exports.default = { name: 'flashcard', schema: FlashcardSchema };
//# sourceMappingURL=Flashcard.js.map