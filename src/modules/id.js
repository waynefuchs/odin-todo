let _id = 0;

export default class ID {
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