"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const AggregateRoot_1 = require("../../../shared/domain/AggregateRoot");
const UniqueGlobalID_1 = require("../../../shared/domain/UniqueGlobalID");
const Result_1 = require("../../../shared/core/Result");
const Guard_1 = require("../../../shared/core/Guard");
class User extends AggregateRoot_1.AggregateRoot {
    // private constructor(props: IUserProps, id?: UniqueGlobalId) {
    //     super(props, id);
    //   }
    get userId() {
        return new UniqueGlobalID_1.UniqueGlobalId();
    }
    get name() {
        return this.name;
    }
    get role() {
        return this.role;
    }
    get email() {
        return this.email;
    }
    get password() {
        return this.password;
    }
    static create(props) {
        const GuardResponse = Guard_1.Guard.againstNullOrUndefinedBulk([
            { argument: props.name, argumentName: "USER_NAME" },
            { argument: props.role, argumentName: "USER_ROLE" },
            { argument: props.email, argumentName: "USER_EMAIL" },
            { argument: props.password, argumentName: "USER_PASSWORD" }
        ]);
        if (GuardResponse.isLeft()) {
            return (0, Result_1.left)(GuardResponse.value);
        }
        return (0, Result_1.right)(new User(props));
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map