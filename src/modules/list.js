import Item from './item';

let todoList = [];

export default class List {
    static contains(title) {
        return todoList.find(i => title === i.getTitle()) !== undefined;
    }

    static addItem(item) {
        if(List.contains(item.getTitle())) return false;
        todoList.push(item);
        return item;
    }

    static deleteItemByName(name) {
        todoList = todoList.filter(i => i.getTitle() !== name);
    }

    static deleteItemByID(id) {
        todoList = todoList.filter(i => i.getID() !== id);
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
    }

    static getItems(done=false) {
        return todoList.filter(i => i.done === done);
    }
}