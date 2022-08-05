export default class ID {
    _id = 0;

    constructor(initID=0) {
        this._id = initID ?? 0;
    }

    getNext() {
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