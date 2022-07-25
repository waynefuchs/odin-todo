export default class List {
    _list;

    constructor(list = []) {
        this._list = list;
    }

    addItem(item) {
        if(this._list.find(i => item.getTitle() === i.getTitle())) throw "Cannot add todo item: Item already exists";
        this._list.push(item);
    }

    deleteItem(name) {
        this._list = this._list.filter(i => i.getTitle() !== name);
    }

    getItems(done=false) {
        return this._list.filter(i => i.done === done);
    }

    getItem(name) {
        return this._list.find(i => i.getTitle() === name);
    }

    contains(name) {
        return this._list.some(i => i.getTitle() === name);
    }
}