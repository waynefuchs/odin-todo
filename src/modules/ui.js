import Storage from "./storage";

const body = document.querySelector("body");
const todoContainerParent = body;

let isAddTodoVisible = false;

export default class UI {
    static loadSite() {
        UI.createContainerTodo();
        UI.createContainerAddItem();
    }

    static createContainerTodo() {
        const todoElement = document.createElement('div');
        todoElement.id = "todo";
        todoContainerParent.append(todoElement);
    }

    // Handle Toggling the Add Item Input and Div
    static toggleAddItem() {
        const addItem = body.querySelector('#add-item-toggle');
        if(isAddTodoVisible) UI.setAddItemDisplayOn(addItem);
        else UI.setAddItemDisplayOff(addItem);
    }
    static setAddItemDisplayOff(element) {
        isAddTodoVisible = true;
        element.style.display = 'block';
        element.querySelector('#input-item-title').focus();
        body.querySelector('#button-toggle-item').textContent = 'highlight_off';
    }
    static setAddItemDisplayOn(element) {
        isAddTodoVisible = false;
        element.style.display = 'none';
        body.querySelector('#button-toggle-item').textContent = 'add_circle_outline';
    }

    static createContainerAddItem() {
        const addItemMainDiv = document.createElement('div');
        addItemMainDiv.id = 'add-item';
        
        const toggleDiv = document.createElement('div');
        toggleDiv.id = 'add-item-toggle';
        toggleDiv.style.display = 'none';

        const inputTextItemTitle = document.createElement('input');
        inputTextItemTitle.id = 'input-item-title';
        inputTextItemTitle.type = 'text';
        inputTextItemTitle.addEventListener('keydown', (e) => {
            if(e.key == 'Enter') UI.addItemByTitle();
        });

        const buttonAdd = document.createElement('button');
        buttonAdd.id = 'button-add';
        buttonAdd.textContent = "Add";
        buttonAdd.addEventListener('click', UI.addItemByTitle);
        
        // Button to show and hide the add (input / button)
        const buttonToggle = document.createElement('button');
        buttonToggle.id = "button-toggle-item";
        buttonToggle.type = 'image';
        buttonToggle.classList.add('material-icons');
        buttonToggle.textContent = 'add_circle_outline';
        buttonToggle.addEventListener('click', UI.toggleAddItem);

        toggleDiv.append(inputTextItemTitle);
        toggleDiv.append(buttonAdd);
        addItemMainDiv.append(toggleDiv);
        addItemMainDiv.append(buttonToggle);
        todoContainerParent.append(addItemMainDiv);
    }

    static clearInputTextAddItem(inputTextItemTitle) {
        inputTextItemTitle.value = "";
    }

    // TODO: Make this an HTML message rather than a pop-up
    static notifyAddFailed(inputTextItemTitle) {
        alert(`Adding ${inputTextItemTitle.value} failed.`);
    }

    static addItemByTitle(e) {
        const inputTextItemTitle = document.querySelector('#input-item-title');
        const item = Storage.addItemByTitle(inputTextItemTitle.value);
        if(!item) UI.notifyAddFailed(inputTextItemTitle);
        this.clearInputTextAddItem(inputTextItemTitle);
    };
}