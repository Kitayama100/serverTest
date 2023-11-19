"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const UniqueGlobalID_1 = require("./UniqueGlobalID");
class Entity {
    constructor(props, id) {
        this.id = id ? id : new UniqueGlobalID_1.UniqueGlobalId();
        this.props = props;
    }
}
exports.Entity = Entity;
//# sourceMappingURL=Entity.js.map