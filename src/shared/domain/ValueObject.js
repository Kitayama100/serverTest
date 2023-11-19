"use strict";
/* a value object is an object with no specific id, generic
ex: name, age*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueObject = void 0;
class ValueObject {
    constructor(props) {
        this.props = props;
    }
    // understand meaning of equals
    equals(comparation) {
        if (!comparation || !this.props) {
            return false;
        }
        return JSON.stringify(comparation) === JSON.stringify(this.props);
    }
}
exports.ValueObject = ValueObject;
//# sourceMappingURL=ValueObject.js.map