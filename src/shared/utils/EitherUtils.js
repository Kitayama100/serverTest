"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EitherUtils = void 0;
const Result_1 = require("../core/Result");
class EitherUtils {
    static combine(array) {
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            if (element.isLeft()) {
                return (0, Result_1.left)(element.value);
            }
        }
        return (0, Result_1.right)(this.success);
    }
    static get success() {
        return true;
    }
}
exports.EitherUtils = EitherUtils;
//# sourceMappingURL=EitherUtils.js.map