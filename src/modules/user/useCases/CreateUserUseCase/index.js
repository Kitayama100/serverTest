"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserController = exports.createUserUseCase = void 0;
const userRepo_1 = require("../../repository/userRepo");
const CreateUserController_1 = require("./CreateUserController");
const createUserUseCase_1 = require("./createUserUseCase");
const services_1 = require("../../services");
const mongoose_1 = require("mongoose");
const createUserUseCase = new createUserUseCase_1.CreateUserUseCase(new userRepo_1.UserRepo(mongoose_1.models));
exports.createUserUseCase = createUserUseCase;
const createUserController = new CreateUserController_1.CreateUserController(createUserUseCase, services_1.authService);
exports.createUserController = createUserController;
//# sourceMappingURL=index.js.map