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
exports.GetSubjectsContainingFlashcardsController = void 0;
const BaseController_1 = require("../../../../shared/infra/http/BaseController");
class GetSubjectsContainingFlashcardsController extends BaseController_1.BaseController {
    constructor(GetSubjectsContainingFlashcardsUseCase) {
        super();
        this.versionRegister.default = "1.0.0";
        this.versionRegister.addToRegister("1.0.0", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield GetSubjectsContainingFlashcardsUseCase.execute();
                if (response.isLeft()) {
                    return this.errorHandler(res, response.value);
                }
                return this.ok(res, response.value);
            }
            catch (err) {
                return this.fail(res, err);
            }
        }));
    }
}
exports.GetSubjectsContainingFlashcardsController = GetSubjectsContainingFlashcardsController;
//# sourceMappingURL=getSubjectsContainingFlashcardsController.js.map