"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.right = exports.left = exports.Right = exports.Left = void 0;
class Left {
    constructor(value) {
        this.value = value;
    }
    isLeft() {
        return true;
    }
    isRight() {
        return false;
    }
    getLeft() {
        return null;
    }
}
exports.Left = Left;
class Right {
    constructor(value) {
        this.value = value;
    }
    isLeft() {
        return false;
    }
    isRight() {
        return true;
    }
    getRight() {
        return this.value;
    }
}
exports.Right = Right;
const left = (l) => {
    return new Left(l);
};
exports.left = left;
const right = (r) => {
    return new Right(r);
};
exports.right = right;
//# sourceMappingURL=Result.js.map