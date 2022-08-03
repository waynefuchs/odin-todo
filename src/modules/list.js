import Item from './item';
import ID from './id';

export default class List {
    todoList;

    constructor(initID) {
        this.todoList = [];
    }

    contains(title) {
        return todoList.find(i => title === i.getTitle()) !== undefined;
    }

    add(item) {
        if(List.contains(item.getTitle())) return false;
        todoList.push(item);
        return item;
    }

    deleteItemByName(name) {
        todoList = todoList.filter(i => i.getTitle() !== name);
    }

    deleteItemByID(id) {
        const item = todoList.find(i => i.getID() === id) ?? false;
        if(item) todoList = todoList.filter(i => i.getID() !== id);
        return item;
    }

    getItemByTitle(title) {
        return todoList.find(i => i.getTitle() === title);
    }

    getItemByID(id) {
        return todoList.find(i => i.getID() === id);
    }

    contains(name) {
        return todoList.some(i => i.getTitle() === name);
    }

    clear () {
        todoList = [];        
    }

    getItems() {
        return todoList;
    }

    getNotDoneItems() {
        return todoList.filter(i => i.done === false);
    }

    getDoneItems() {
        return todoList.filter(i => i.done === true);
    }
}