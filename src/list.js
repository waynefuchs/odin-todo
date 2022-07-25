let todolist = [];

export default class List {
    addItem(item) {
        if(todolist.find(i => item.getTitle() === i.getTitle())) throw "Cannot add todo item: Item already exists";
        todolist.push(item);
    }

    deleteItemByName(name) {
        todolist = todolist.filter(i => i.getTitle() !== name);
    }

    deleteItemByID(id) {
        todolist = todolist.filter(i => i.getID() !== id);
    }

    getItems(done=false) {
        return todolist.filter(i => i.done === done);
    }

    getItemByName(name) {
        return todolist.find(i => i.getTitle() === name);
    }

    getItemByID(id) {
        return todolist.find(i => i.getID() === id);
    }

    contains(name) {
        return todolist.some(i => i.getTitle() === name);
    }
}