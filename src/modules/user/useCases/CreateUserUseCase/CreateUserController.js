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
exports.CreateUserController = void 0;
const BaseController_1 = require("../../../../shared/infra/http/BaseController");
const jwt_1 = require("../../domain/jwt");
class CreateUserController extends BaseController_1.BaseController {
    constructor(CreateUserUseCase, authService) {
        super();
        this.versionRegister.default = "1.0.0";
        this.versionRegister.addToRegister("1.0.0", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const dto = req.body;
                const result = yield CreateUserUseCase.execute(dto);
                if (result.isLeft()) {
                    return this.errorHandler(res, result.value);
                }
                const token = yield authService.signJWT({
                    uid: result.value._id,
                    email: dto.email,
                    name: dto.name,
                    token_function: jwt_1.TokenFunctions.authenticateUser,
                    role: dto.role,
                });
                this.ok(res, { token: token });
            }
            catch (err) {
                this.fail(res, err);
            }
        }));
    }
}
exports.CreateUserController = CreateUserController;
//# sourceMappingURL=CreateUserController.js.map