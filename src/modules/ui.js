import Storage from './storage';
import Item from './item';

const body = document.querySelector("body");

let isAddTodoVisible = false;

export default class UI {
    static loadSite() {
        UI.createMessageContainer();
        UI.createHeading('todo');
        UI.createContainerTodo();
        UI.createContainerAddItem();
        UI.createHeading('done');
        UI.createContainerDone();
        UI.loadList();
    }

    static createHeading(message) {
        const heading = document.createElement('h2');
        heading.textContent = message;
        body.append(heading);
    }

    static createContainerTodo() {
        const todoElement = document.createElement('div');
        todoElement.id = "todo";
        body.append(todoElement);
    }

    static createContainerDone() {
        const doneElement = document.createElement('div');
        doneElement.id = "done";
        body.append(doneElement);
    }

    // Handle Toggling the Add Item Input and Div
    static toggleAddItem(e) {
        e.target.classList.toggle('cancel');
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

        const div = document.createElement('div');
        div.id = `item${id}`;
        div.classList.add('item');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `item-checkbox${id}`;
        checkbox.addEventListener('change', UI.checkboxChanged);
        checkbox.checked = item.isDone();

        const title = document.createElement('label');
        title.htmlFor = checkbox.id;
        title.id = `item-title${id}`;
        title.textContent = item.getTitle();

        const buttonDelete = document.createElement('button');
        buttonDelete.textContent = 'delete_forever';
        buttonDelete.classList.add('material-icons');
        buttonDelete.classList.add('delete');
        buttonDelete.addEventListener('click', UI.deleteItem.bind(div));

        div.append(checkbox);
        div.append(title);
        div.append(buttonDelete);
        
        if(item.isDone()) done.append(div);
        else todo.append(div);
    }

    static checkboxChanged(e) {
        const id = parseInt(e.target.id.slice(13));
        const checked = e.target.checked;
        const itemElement = document.querySelector(`#item${id}`);
        Storage.setDone(id, checked);
        if(checked) done.appendChild(itemElement);
        else todo.appendChild(itemElement);
    }

    static deleteItem(e) {
        const id = parseInt(this.id.slice(4));
        const itemElement = document.querySelector(`#item${id}`);
        if(Storage.deleteItem(id)) itemElement.remove();
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
        buttonToggle.classList.add('material-icons');
        buttonToggle.textContent = 'add_circle_outline';
        buttonToggle.addEventListener('click', UI.toggleAddItem);

        toggleDiv.append(inputTextItemTitle);
        toggleDiv.append(buttonAdd);
        addItemMainDiv.append(toggleDiv);
        addItemMainDiv.append(buttonToggle);
        body.append(addItemMainDiv);
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
        UI.clearInputTextAddItem();
        if(!item) {
            UI.notify(`Adding ${title} failed.`);
            return;
        }
        UI.createItem(item);
    };


    static loadList() {
        const list = Storage.load();
        for(const item of list) {
            UI.createItem(item);
        }
    }

}