"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericError = exports.BaseError = void 0;
class BaseError {
    constructor(props) {
        this.value = props;
    }
    get error() {
        return this.value;
    }
    prettyError() {
        return `[${this.value.location}]: ${this.value.errorMessage}`;
    }
}
exports.BaseError = BaseError;
class GenericError extends BaseError {
    constructor(props) {
        super(props);
    }
    static create(props) {
        return new GenericError(props);
    }
}
exports.GenericError = GenericError;
//# sourceMappingURL=Error.js.map