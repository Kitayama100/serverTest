"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// TODO: review subject schema
const SubjectSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    active: { type: Boolean, default: false }
    // description : {type : String, required: false},
    // teacher : {type : String, required : false}
    // grade : {type : Number, required : true}
});
// export default mongoose.model('subject', SubjectSchema)
exports.default = { name: "subject", schema: SubjectSchema };
//# sourceMappingURL=Subject.js.map