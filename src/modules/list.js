import { EVENT_DATA_CHANGED, EVENT_LIST_CLEAR } from "./event-types";

let todoList = [];

function notifyListClear() {
    PubSub.publish(EVENT_LIST_CLEAR, this);
}

function notifyDataDirty() {
    PubSub.publish(EVENT_DATA_CHANGED);
}

export default class List {
    static itemTitleExists(title) {
        return todoList.find(i => title === i.getTitle()) !== undefined;
    }

    static addItem(item) {
        // Guard Clauses
        if(List.itemTitleExists(item.title))
            throw "Cannot add todo item: Item title must be unique.";
        todoList.push(item);
        notifyDataDirty();
    }

    static deleteItemByName(name) {
        todoList = todoList.filter(i => i.getTitle() !== name);
        notifyDataDirty();
    }

    static deleteItemByID(id) {
        todoList = todoList.filter(i => i.getID() !== id);
        notifyDataDirty();
    }

    static getItemByName(name) {
        return todoList.find(i => i.getTitle() === name);
    }

    static getItemByID(id) {
        return todoList.find(i => i.getID() === id);
    }

    static contains(name) {
        return todoList.some(i => i.getTitle() === name);
    }

    static clear () {
        todoList = [];        
        notifyListClear();          // Private
        notifyDataDirty();
    }

    static getItems(done=false) {
        return todoList.filter(i => i.done === done);
    }
}