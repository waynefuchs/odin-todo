import Storage from './storage';
import Item from './item';

const body = document.querySelector("body");
const todoContainerParent = body;

let isAddTodoVisible = false;

export default class UI {
    static loadSite() {
        UI.createMessageContainer();
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

    static createMessageContainer() {
        const messageDiv = document.createElement('div');
        messageDiv.id = 'message';
        body.append(messageDiv);
    }

    static createMessage(text) {
        const messageDiv = document.querySelector('#message');
        const message = document.createElement('p');
        message.textContent = text;
        messageDiv.append(message);
    }

    static createItem(item) {
        const id = item.getID();
        const todoElement = document.querySelector('#todo');

        const div = document.createElement('div');
        div.id = `item${id}`;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `item-checkbox${id}`;

        const title = document.createElement('p');
        title.id = `item-title${id}`;
        title.textContent = item.getTitle();

        div.append(checkbox);
        div.append(title);
        todoElement.append(div);
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

    static clearInputTextAddItem() {
        const inputTextItemTitle = document.querySelector('#input-item-title');
        inputTextItemTitle.value = "";
    }

    static notify(message) {
        UI.createMessage(message);
    }

    static addItemByTitle(e) {
        const inputTextItemTitle = document.querySelector('#input-item-title');
        const title = inputTextItemTitle.value;
        const item = Storage.addItemByTitle(title);
        this.clearInputTextAddItem();
        if(!item) {
            UI.notify(`Adding ${title} failed.`);
            return;
        }
        this.createItem(item);
    };

    static createItemContainer(item) {

    }
}