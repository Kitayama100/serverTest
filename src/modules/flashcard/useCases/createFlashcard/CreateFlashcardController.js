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
exports.CreateFlashcardController = void 0;
const BaseController_1 = require("../../../../shared/infra/http/BaseController");
class CreateFlashcardController extends BaseController_1.BaseController {
    constructor(CreateFlashcardUseCase) {
        super();
        this.versionRegister.default = "1.0.0";
        this.versionRegister.addToRegister("1.0.0", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                // new Middleware(req, res, next)
                const dto = req.body;
                const flashcard = yield CreateFlashcardUseCase.execute(dto);
                if (flashcard.isLeft()) {
                    this.errorHandler(res, flashcard.value);
                }
                this.ok(res, flashcard.value);
            }
            catch (err) {
                this.fail(res, err);
            }
        }));
    }
}
exports.CreateFlashcardController = CreateFlashcardController;
//# sourceMappingURL=CreateFlashcardController.js.map