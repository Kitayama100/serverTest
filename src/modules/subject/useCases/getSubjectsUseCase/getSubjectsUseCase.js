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
exports.GetSubjectsUseCase = void 0;
const Result_1 = require("../../../../shared/core/Result");
class GetSubjectsUseCase {
    constructor(repo) {
        this.subjectRepo = repo;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.subjectRepo.find_many({ filter: {} });
            if (response.isLeft()) {
                return (0, Result_1.left)(response.value);
            }
            return (0, Result_1.right)(response.value);
        });
    }
}
exports.GetSubjectsUseCase = GetSubjectsUseCase;
//# sourceMappingURL=getSubjectsUseCase.js.map