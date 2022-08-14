export default class ID {
    _id = 1;

    constructor(initID=0) {
        this._id = initID ?? 1;
    }

    next() {
        return this._id++;
    }

    set(id) {
        this._id = id;
    }

    get() {
        return this._id;
    }

    toString() {
        return this._id.toString();
    }

    toJSON() {
        return this._id;
    }
};