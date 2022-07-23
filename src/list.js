export default class List {
    _list;

    constructor(list = []) {
        this._list = list;
    }

    addItem(item) {
        if(this._list.find(i => item.getName() === i.getName())) throw "Cannot add todo item: Item already exists";
        this._list.push(item);
    }

    deleteItem(name) {
        this._list = this._list.filter(i => i.getName() !== name);
    }

    getItems(done=false) {
        return this._list.filter(i => i.done === done);
    }

    getItem(name) {
        return this._list.find(i => i.getName() === name);
    }

    contains(name) {
        return this._list.some(i => i.getName() === name);
    }
}