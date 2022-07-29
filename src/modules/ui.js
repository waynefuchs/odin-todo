const body = document.querySelector("body");
const todoContainerParent = body;

export default class UI {
    static loadSite() {
        UI.createTodoContainer();
    }

    static createTodoContainer() {
        const todoElement = document.createElement('div');
        todoElement.id = "todo";
        todoContainerParent.append(todoElement);
    }

}