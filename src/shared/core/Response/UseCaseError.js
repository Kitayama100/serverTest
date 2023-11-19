"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonUseCaseResult = void 0;
const Error_1 = require("./Error");
var CommonUseCaseResult;
(function (CommonUseCaseResult) {
    class InvalidValue extends Error_1.BaseError {
        constructor(props) {
            super({
                errorMessage: props.errorMessage,
                code: `INVALID_${props.variable.toUpperCase()}`,
                location: props.location,
                variable: props.variable
            });
        }
        static create(props) {
            return new InvalidValue(props);
        }
    }
    CommonUseCaseResult.InvalidValue = InvalidValue;
    class Conflict extends Error_1.BaseError {
        constructor(props) {
            super({
                errorMessage: props.errorMessage,
                code: `CONFLICT_${props.variable.toUpperCase()}`,
                location: props.location,
                variable: props.variable
            });
        }
        static create(props) {
            return new Conflict(props);
        }
    }
    CommonUseCaseResult.Conflict = Conflict;
    class UnexpectedError extends Error_1.BaseError {
        constructor(err) {
            super({
                errorMessage: `An unexpected error occurred.`,
                error: err,
                code: "SERVER_ERROR",
                location: "App"
            });
            console.log(`[AppError]: An unexpected error occurred`);
            console.error(err);
        }
        static create(err) {
            return new UnexpectedError(err);
        }
    }
    CommonUseCaseResult.UnexpectedError = UnexpectedError;
    class Forbidden extends Error_1.BaseError {
        constructor(props) {
            super({
                errorMessage: props.errorMessage,
                code: `FORBIDDEN_${props.variable.toUpperCase()}`,
                location: props.location,
                variable: props.variable
            });
        }
        static create(props) {
            return new Conflict(props);
        }
    }
    CommonUseCaseResult.Forbidden = Forbidden;
})(CommonUseCaseResult || (exports.CommonUseCaseResult = CommonUseCaseResult = {}));
//# sourceMappingURL=UseCaseError.js.map