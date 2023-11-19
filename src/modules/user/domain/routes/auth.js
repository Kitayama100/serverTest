"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const userRepo_1 = require("../../repository/userRepo");
const services_1 = require("../../services");
const CreateUserUseCase_1 = require("../../useCases/CreateUserUseCase");
const loginController_1 = require("../../useCases/login/loginController");
const mongoose_1 = require("mongoose");
const loginUseCase_1 = require("../../useCases/login/loginUseCase");
const authRouter = express_1.default.Router();
exports.authRouter = authRouter;
authRouter.post("/register", (req, res) => { CreateUserUseCase_1.createUserController.execute(req, res); });
authRouter.post("/login", (req, res) => { new loginController_1.LoginController(new loginUseCase_1.LoginUseCase(new userRepo_1.UserRepo(mongoose_1.models)), services_1.authService).execute(req, res); });
//# sourceMappingURL=auth.js.map