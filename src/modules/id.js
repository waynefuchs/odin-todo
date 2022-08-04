export default class ID {
    _id = 0;

    constructor(initID) {
        this._id = initID;
    }

    getNext() {
        return _id++;
    }

    set(id) {
        _id = id;
    }

    get() {
        return _id;
    }

    toJSON() {
        return this._id;
    }
};