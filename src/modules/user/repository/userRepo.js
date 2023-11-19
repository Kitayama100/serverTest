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
exports.UserRepo = void 0;
const UserMap_1 = require("../mappers/UserMap");
const Result_1 = require("../../../shared/core/Result");
const UseCaseError_1 = require("../../../shared/core/Response/UseCaseError");
const bcrypt = require("bcrypt");
class UserRepo {
    constructor(models) {
        this.saltRounds = 10;
        this.models = models;
    }
    //although counter-intuitive, when the object does not exist it returns right(true)
    exists(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const UserModel = this.models.user;
            try {
                const user = yield UserModel.findOne(props.filter);
                if (!user) {
                    return (0, Result_1.right)(true);
                }
                return (0, Result_1.left)(UseCaseError_1.CommonUseCaseResult.InvalidValue.create({
                    errorMessage: `An user was already found using these params: ${props.filter}`,
                    location: `${UserRepo.name}.${this.exists.name}`,
                    variable: "USER_PARAMS"
                }));
            }
            catch (error) {
                return (0, Result_1.left)(UseCaseError_1.CommonUseCaseResult.UnexpectedError.create(error));
            }
        });
    }
    create(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const UserModel = this.models.user;
            const UserObjectOrError = UserMap_1.UserMap.toObject(props.dto);
            if (UserObjectOrError.isLeft()) {
                return (0, Result_1.left)(UserObjectOrError.value);
            }
            const UserObject = UserObjectOrError.value;
            UserObject.password = yield bcrypt.hash(UserObject.password, this.saltRounds);
            try {
                const newUser = yield UserModel.create(UserObject);
                if (!newUser) {
                    return (0, Result_1.left)(UseCaseError_1.CommonUseCaseResult.UnexpectedError.create({
                        errorMessage: `Unexpected error while creating user: ${UserObject}`,
                        location: `${UserRepo.name}.${this.create.name}`,
                        variable: "USER_REPO_CREATE_USER"
                    }));
                }
                return (0, Result_1.right)(newUser);
            }
            catch (error) {
                return (0, Result_1.left)(UseCaseError_1.CommonUseCaseResult.UnexpectedError.create(error));
            }
        });
    }
    find_one(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const UserModel = this.models.user;
            try {
                const user = yield UserModel.findOne(props.filter);
                if (user) {
                    return (0, Result_1.right)(user);
                }
                return (0, Result_1.left)(UseCaseError_1.CommonUseCaseResult.UnexpectedError.create({
                    errorMessage: `User could not be found with specified parameters`,
                    location: `${UserRepo.name}.${this.create.name}`,
                    variable: "USER_REPO_FIND_USER"
                }));
            }
            catch (error) {
                return (0, Result_1.left)(UseCaseError_1.CommonUseCaseResult.UnexpectedError.create(error));
            }
        });
    }
}
exports.UserRepo = UserRepo;
//# sourceMappingURL=userRepo.js.map