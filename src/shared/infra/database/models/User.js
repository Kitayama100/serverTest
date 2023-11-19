"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    role: { type: Number, required: true, default: 0 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // phone_number : {type : String, required : false, unique : true}
});
exports.default = { name: "user", schema: UserSchema };
//# sourceMappingURL=User.js.map