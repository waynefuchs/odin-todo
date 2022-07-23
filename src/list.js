export default class List {
    _list;

    constructor(list = []) {
        this._list = list;
    }

    addItem(item) {
        if(this._list.find(i => item.getName() === i.getName())) return;
        this._list.push(item);
    }

    deleteItem(name) {
        this._list = this._list.filter(i => i.getName() !== name);
    }

    getItems() {
        return this._list;
    }

    getItem(name) {
        return this._list.find(i => i.getName() === name);
    }

    contains(name) {
        return this._list.some(i => i.getName() === name);
    }
}