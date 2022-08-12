import Log from "../log";

export default class Container {
    list;

    constructor() {
        Log.debug("Container.constructor()");
        this.list = [];
    }

    // returns: true or false
    contains(key, value) {
        Log.debug("Container.contains()");
        if(key === null || value === null) return false;
        return this.list.find(o => o[key] === value) !== undefined;
    }

    // return: success (true or false)
    add(object, hasKey=null, equalToValue=null) {
        Log.debug("Container.add()");
        // TODO: Check list for duplicate values
        // this if statement doesn't do that lol
        // if(this.contains(key, value)) return false;
        this.list.push(object);
        return true;
    }

    // return: number of removed objects
    del(key, value) {
        Log.debug("Container.del()");
        const oldLength = this.list.length;
        this.list = this.list.filter(o => o[key] !== value);
        return this.list.length - oldLength;
    }

    get(key, value) {
        Log.debug("Container.get()");
        return this.list.find(o => o[key] === value);
    }

    getAll() {
        Log.debug("Container.getAll()");
        return this.list;
    }

    erase() {
        Log.debug("Container.erase()");
        this.list = [];
    }

    isEmpty() {
        Log.debug("Container.isEmpty()");
        return this.list.length === 0;
    }
}