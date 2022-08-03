export default class ID {
    _id = 0;

    constructor(initID) {
        this._id = initID;
    }

    static getNext() {
        return _id++;
    }

    static set(id) {
        _id = id;
    }

    static get() {
        return _id;
    }
};