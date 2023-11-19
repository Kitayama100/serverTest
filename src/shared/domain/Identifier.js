"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Identifier = void 0;
class Identifier {
    constructor(value) {
        this.value = value;
        this.value = value;
    }
    toValue() {
        return this.value;
    }
    equals(id) {
        if (id === null || id === undefined) {
            return false;
        }
        if (!(id instanceof this.constructor)) {
            return false;
        }
        return id.toValue() === this.value;
    }
}
exports.Identifier = Identifier;
// const test = new Identifier<string>('asd')
// console.log (test.equals(new Identifier<string>('asdd')))
// understand what this means
//# sourceMappingURL=Identifier.js.map