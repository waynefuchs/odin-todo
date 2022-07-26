import { EVENT_DATA_CHANGED, EVENT_LIST_CLEAR } from "./event-types";

let todoList = [];

function notifyListClear() {
    PubSub.publish(EVENT_LIST_CLEAR, this);
}

function notifyDataDirty() {
    PubSub.publish(EVENT_DATA_CHANGED);
}

export default class List {
    itemTitleExists(title) {
        return todoList.find(i => title === i.getTitle()) !== undefined;
    }

    addItem(item) {
        // Guard Clauses
        if(this.itemTitleExists(item.title))
            throw "Cannot add todo item: Item title must be unique.";
        todoList.push(item);
        notifyDataDirty();
    }

    deleteItemByName(name) {
        todoList = todoList.filter(i => i.getTitle() !== name);
        notifyDataDirty();
    }

    deleteItemByID(id) {
        todoList = todoList.filter(i => i.getID() !== id);
        notifyDataDirty();
    }

    getItems(done=false) {
        return todoList.filter(i => i.done === done);
    }

    getItemByName(name) {
        return todoList.find(i => i.getTitle() === name);
    }

    getItemByID(id) {
        return todoList.find(i => i.getID() === id);
    }

    contains(name) {
        return todoList.some(i => i.getTitle() === name);
    }

    clear () {
        todoList = [];        
        notifyListClear();
        notifyDataDirty();
    }
}