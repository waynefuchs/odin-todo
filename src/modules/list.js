import Item from './item';

let todoList = [];

export default class List {
    static contains(title) {
        return todoList.find(i => title === i.getTitle()) !== undefined;
    }

    static add(item) {
        if(List.contains(item.getTitle())) return false;
        todoList.push(item);
        return item;
    }

    static deleteItemByName(name) {
        todoList = todoList.filter(i => i.getTitle() !== name);
    }

    static deleteItemByID(id) {
        const item = todoList.find(i => i.getID() === id) ?? false;
        if(item) todoList = todoList.filter(i => i.getID() !== id);
        return item;
    }

    static getItemByTitle(title) {
        return todoList.find(i => i.getTitle() === title);
    }

    static getItemByID(id) {
        return todoList.find(i => i.getID() === id);
    }

    static contains(name) {
        return todoList.some(i => i.getTitle() === name);
    }

    static clear () {
        todoList = [];        
    }

    static getItems() {
        return todoList;
    }

    static getNotDoneItems() {
        return todoList.filter(i => i.done === false);
    }

    static getDoneItems() {
        return todoList.filter(i => i.done === true);
    }
}