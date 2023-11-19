"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guard = void 0;
const Result_1 = require("./Result");
const Error_1 = require("./Response/Error");
class Guard {
    static againstAtLeast(numChars, text) {
        return text.length >= numChars
            ? (0, Result_1.right)(true)
            : (0, Result_1.left)(Error_1.GenericError.create({
                errorMessage: `Text is not at least ${numChars} chars.`,
                location: `${Guard.name}.${this.againstAtLeast.name}`
            }));
    }
    static againstEmpty(array, argumentName) {
        if (array.length > 0) {
            return (0, Result_1.right)(true);
        }
        else {
            return (0, Result_1.left)(Error_1.GenericError.create({
                errorMessage: `Array ${argumentName} is empty.`,
                location: `${Guard.name}.${this.againstEmpty.name}`
            }));
        }
    }
    static againstAtMost(numChars, text) {
        return text.length <= numChars ?
            (0, Result_1.right)(true) :
            (0, Result_1.left)(Error_1.GenericError.create({
                errorMessage: `Text is not at most ${numChars} chars.`,
                location: `${Guard.name}.${this.againstAtLeast.name}`
            }));
    }
    static againstNullOrUndefined(argument, argumentName) {
        if (argument === null || argument === undefined || argument === "") {
            return (0, Result_1.left)(Error_1.GenericError.create({
                errorMessage: `${argumentName} is null or undefined`,
                location: `${Guard.name}.${this.againstAtLeast.name}`
            }));
        }
        return (0, Result_1.right)(true);
    }
    static againstNullOrUndefinedBulk(args) {
        // const or let?
        for (const arg of args) {
            const result = this.againstNullOrUndefined(arg.argument, arg.argumentName);
            if (result.isLeft()) {
                return (0, Result_1.left)(result.value);
            }
        }
        return (0, Result_1.right)(true);
    }
    static inRange(number, min, max, argumentName) {
        if (number >= min && number <= max) {
            return (0, Result_1.right)(true);
        }
        else {
            return (0, Result_1.left)(Error_1.GenericError.create({
                errorMessage: `${argumentName} is not within range of ${min} to ${max}`,
                location: `${Guard.name}.${this.inRange.name}`
            }));
        }
    }
    static inArray(value, array, argumentName) {
        if (!array.includes(value)) {
            return (0, Result_1.right)(true);
        }
        else {
            return (0, Result_1.left)(Error_1.GenericError.create({
                errorMessage: `${argumentName} is in guarded array.`,
                location: `${Guard.name}.${Guard.inArray.name}`
            }));
        }
    }
}
exports.Guard = Guard;
//# sourceMappingURL=Guard.js.map