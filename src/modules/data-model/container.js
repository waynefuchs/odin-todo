export default class Container {
    list;

    constructor() {
        this.list = [];
    }

    // returns: true or false
    contains(key, value) {
        if(key === null || value === null) return false;
        return this.list.find(o => o[key] === value) !== undefined;
    }

    // return: success (true or false)
    add(object, hasKey=null, equalToValue=null) {
        // TODO: Check list for duplicate values
        // this if statement doesn't do that lol
        // if(this.contains(key, value)) return false;
        this.list.push(object);
        return true;
    }

    insert(object, index) {
        this.list.splice(index, 0, object);
    }

    // return: number of removed objects
    delete(key, value) {
        const oldLength = this.list.length;
        this.list = this.list.filter(o => o[key] !== value);
        return (oldLength - this.list.length) > 0;
    }

    get(key, value) {
        return this.list.find(o => o[key] === value);
    }

    getAll() {
        return this.list;
    }

    erase() {
        this.list = [];
    }

    isEmpty() {
        return this.list.length === 0;
    }
}