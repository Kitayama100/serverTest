"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subject = void 0;
const Result_1 = require("../../../shared/core/Result");
const AggregateRoot_1 = require("../../../shared/domain/AggregateRoot");
const Guard_1 = require("../../../shared/core/Guard");
const UniqueGlobalID_1 = require("../../../shared/domain/UniqueGlobalID");
class Subject extends AggregateRoot_1.AggregateRoot {
    get subjectId() {
        return new UniqueGlobalID_1.UniqueGlobalId();
    }
    get name() {
        return this.name;
    }
    static create(props) {
        const GuardResponse = Guard_1.Guard.againstNullOrUndefined(props.name, "SUBJECT_NAME");
        if (GuardResponse.isLeft()) {
            return (0, Result_1.left)(GuardResponse.value);
        }
        return (0, Result_1.right)(new Subject(props));
    }
}
exports.Subject = Subject;
//# sourceMappingURL=Subject.js.map