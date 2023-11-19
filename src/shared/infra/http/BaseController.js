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
exports.BaseController = void 0;
const Error_1 = require("../../core/Response/Error");
const UseCaseError_1 = require("../../core/Response/UseCaseError");
const VersionControl_1 = require("../../core/VersionControl");
class BaseController {
    constructor() {
        //   abstract execute (req: express.Request, res: express.Response): void;
        this.versionRegister = new VersionControl_1.VersionControl();
    }
    execute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userV = req.headers["accept-version"];
                const versionSearch = this.versionRegister.getVersion(userV);
                if (versionSearch.isLeft()) {
                    const maxV = this.versionRegister.max();
                    if (maxV.isLeft()) {
                        this.fail(res, maxV.value.prettyError());
                    }
                    else {
                        this.notFound(res, `Version ${userV} not found, current version: ${maxV.value}`);
                    }
                }
                else {
                    versionSearch.value(req, res);
                }
            }
            catch (error) {
                console.log(`[BaseController]: Uncaught controller error`);
                this.fail(res, "An unexpected error occurred");
            }
        });
    }
    static jsonResponse(res, code, message) {
        return res.status(code).json({ message });
    }
    ok(res, dto) {
        if (!!dto) {
            return res.status(200).json(dto);
        }
        else {
            return res.sendStatus(200);
        }
    }
    created(res) {
        return res.sendStatus(201);
    }
    clientError(res, message) {
        return BaseController.jsonResponse(res, 400, message ? message : 'Unauthorized');
    }
    unauthorized(res, message) {
        return BaseController.jsonResponse(res, 401, message ? message : 'Unauthorized');
    }
    paymentRequired(res, message) {
        return BaseController.jsonResponse(res, 402, message ? message : 'Payment required');
    }
    forbidden(res, message) {
        return BaseController.jsonResponse(res, 403, message ? message : 'Forbidden');
    }
    notFound(res, message) {
        return BaseController.jsonResponse(res, 404, message ? message : 'Not found');
    }
    conflict(res, message) {
        return BaseController.jsonResponse(res, 409, message ? message : 'Conflict');
    }
    tooMany(res, message) {
        return BaseController.jsonResponse(res, 429, message ? message : 'Too many requests');
    }
    fail(res, error) {
        return res.status(500).json({
            message: error.toString()
        });
    }
    errorHandler(res, error) {
        switch (error.constructor) {
            case UseCaseError_1.CommonUseCaseResult.InvalidValue:
                return this.clientError(res, error.prettyError());
            case UseCaseError_1.CommonUseCaseResult.Conflict:
                return this.conflict(res, error.prettyError());
            case UseCaseError_1.CommonUseCaseResult.UnexpectedError:
                return this.fail(res, error.prettyError());
            case UseCaseError_1.CommonUseCaseResult.Forbidden:
                return this.forbidden(res, error.prettyError());
            case Error_1.GenericError:
                return this.clientError(res, error.prettyError());
        }
        this.fail(res, "Unknown error");
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=BaseController.js.map