"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VersionControl = void 0;
const semver_1 = __importDefault(require("semver"));
const Guard_1 = require("./Guard");
const Result_1 = require("./Result");
const Error_1 = require("./Response/Error");
/**
 * {"2.0.0": x,
 * "1.0.0": y}
 * typeof x == y
 */
class VersionControl {
    constructor(defaultVersion) {
        this.register = {};
        this.defaultVersion = defaultVersion || "latest_stable";
    }
    addToRegister(version, value) {
        const clean = semver_1.default.valid(version);
        const check = Guard_1.Guard.againstNullOrUndefined(clean, "version");
        if (check.isRight()) {
            const guardAlreadyInRegister = Guard_1.Guard.inArray(version, Object.keys(this.register), "version");
            if (guardAlreadyInRegister.isRight()) {
                this.register[version] = value;
            }
            else {
                //In case of register error application must raise error.
                throw new RangeError(`[VersionRegister(register)]: ${guardAlreadyInRegister.value.error.errorMessage}`);
            }
        }
        else {
            //In case of register error application must raise error.
            throw new TypeError(`[VersionRegister(register)]: ${check.value.error.errorMessage}`);
        }
    }
    getVersion(version) {
        if (version) {
            const searchResult = this.findVersionInRegister(version);
            if (searchResult.isLeft()) {
                return (0, Result_1.left)(searchResult.value);
            }
            else {
                return (0, Result_1.right)(searchResult.value);
            }
        }
        else {
            if (this.defaultVersion !== "latest_stable") {
                const deafultSearchResult = this.findVersionInRegister(this.defaultVersion);
                if (deafultSearchResult.isLeft()) {
                    return (0, Result_1.left)(deafultSearchResult.value);
                }
                else {
                    return (0, Result_1.right)(deafultSearchResult.value);
                }
            }
            const highestVersion = this.max();
            if (highestVersion.isLeft()) {
                return (0, Result_1.left)(highestVersion.value);
            }
            else {
                return (0, Result_1.right)(this.register[highestVersion.value]);
            }
        }
    }
    findVersionInRegister(version) {
        const cachedVersionData = this.register[version];
        const check = Guard_1.Guard.againstNullOrUndefined(cachedVersionData, "Cached version data");
        if (check.isRight()) {
            return (0, Result_1.right)(cachedVersionData);
        }
        return (0, Result_1.left)(check.value);
    }
    set default(version) {
        const clean = semver_1.default.clean(version);
        const check = Guard_1.Guard.againstNullOrUndefined(clean, "Default version");
        if (check.isRight()) {
            this.defaultVersion = version;
            return;
        }
        throw new Error("Invalid version provided: " + version);
    }
    //TODO: CHECK IF VERSION IS IN PRODUCTION
    max() {
        const checkEmpty = Guard_1.Guard.againstEmpty(Object.keys(this.register), "Version register");
        if (checkEmpty.isRight()) {
            let max = "0.0.0";
            for (let i = 0; i < Object.keys(this.register).length; i++) {
                const v = Object.keys(this.register)[i];
                if (semver_1.default.gt(v, max)) {
                    max = v;
                }
            }
            return (0, Result_1.right)(max);
        }
        return (0, Result_1.left)(Error_1.GenericError.create({
            errorMessage: "Version Control is empty",
            location: `${VersionControl.name}.${this.max.name}`
        }));
    }
    contains(v) {
        const checkEmpty = Guard_1.Guard.againstEmpty(Object.keys(this.register), "Version register");
        if (checkEmpty.isRight()) {
            if (Object.keys(this.register).includes(v)) {
                return true;
            }
            return false;
        }
        else {
            throw new TypeError(`[VersionRegister(contains)]: ${checkEmpty.value.error.errorMessage}`);
        }
    }
}
exports.VersionControl = VersionControl;
//# sourceMappingURL=VersionControl.js.map