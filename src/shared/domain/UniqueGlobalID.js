"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueGlobalId = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Identifier_1 = require("./Identifier");
const Guard_1 = require("../core/Guard");
const Result_1 = require("../core/Result");
class UniqueGlobalId extends Identifier_1.Identifier {
    constructor(id) {
        super(id ? id : new mongoose_1.default.Types.ObjectId().toString());
    }
    static createExisting(id) {
        const GuardResponse = Guard_1.Guard.againstNullOrUndefined(id, "GLOBAL_ID");
        if (GuardResponse.isLeft()) {
            return (0, Result_1.left)(GuardResponse.value);
        }
        return (0, Result_1.right)(new UniqueGlobalId(id));
    }
}
exports.UniqueGlobalId = UniqueGlobalId;
//# sourceMappingURL=UniqueGlobalID.js.map