import Storage from './storage';
import UIAddItem from './ui/add-item';
// import Item from './item';

const body = document.querySelector("body");

let isAddProjectVisible = false;
let messageList = [];
let messageID = 0;

export default class UI {
    static loadSite() {
        UI.createHeading('h1', 'todo');
        UI.createMessageContainer();

        UI.createToggleGroup();

        UI.createContainerTodo();
        UI.createContainerDone();
        UI.loadList();
        document.addEventListener('keydown', UI.listenForKeyboardEvents);
    }

    static listenForKeyboardEvents(e) {
        if(e.key === "Escape") {
            if(messageList.length > 0) UI.deleteMessage.bind(messageList[0])();
            else if(isAddTodoVisible) UI.toggleAddItem();
        } else if(e.key === 'n' && !isAddTodoVisible) {
            e.preventDefault();
            UIAddItem.toggle();
        }
        
        //else console.log(e.key);
    }

    static createHeading(type, message) {
        const heading = document.createElement(type);
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


    

    // Handle Toggling the Add Project Input and Div
    static toggleAddProject() {
        const button = document.querySelector('#button-toggle-project');
        button.classList.toggle('cancel');
        const addItem = body.querySelector('#add-project-toggle');
        if(isAddProjectVisible) UI.setAddProjectVisible(addItem);
        else UI.setAddProjectHidden(addItem);
    }
    static setAddProjectVisible(element) {
        isAddProjectVisible = true;
        element.classList.remove('hidden');
        element.querySelector('#input-project-name').focus();
        body.querySelector('#button-toggle-project').textContent = 'folder_open';
    }
    static setAddProjectHidden(element) {
        isAddProjectVisible = false;
        element.classList.add('hidden');
        body.querySelector('#button-toggle-project').textContent = 'create_new_folder';
    }


    static createMessageContainer() {
        const messageDiv = document.createElement('div');
        messageDiv.id = 'message';
        body.append(messageDiv);
    }

    static createMessage(text) {
        const containerDiv = document.querySelector('#message');

        const messageDiv = document.createElement('div');
        messageDiv.id = `message${messageID++}`;
        messageDiv.classList.add('message');

        const buttonDelete = document.createElement('button');
        buttonDelete.id = `buttonDelete${messageDiv.id}`
        buttonDelete.classList.add('material-icons');
        buttonDelete.classList.add('cancel');
        buttonDelete.textContent = "warning";
        buttonDelete.addEventListener('click', UI.deleteMessage.bind(messageDiv));

        const message = document.createElement('label');
        message.htmlFor = buttonDelete.id;
        message.textContent = text;

        messageDiv.append(message);
        messageDiv.append(buttonDelete);

        containerDiv.append(messageDiv);
        messageList.push(messageDiv);
    }

    static deleteMessage() {
        messageList = messageList.filter(m => m.id !== this.id);
        this.remove();
    }

    static createItem(item) {
        const id = item.getID();

        const div = document.createElement('div');
        div.id = `item${id}`;
        div.classList.add('item');
        div.draggable = "true";

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
        
        if(item.isDone()) {
            done.append(div);
            title.classList.add('strikethrough');
        }
        else {
            todo.append(div);
            title.classList.remove('strikethrough');
        }
    }

    static checkboxChanged(e) {
        const id = parseInt(e.target.id.slice(13));
        const checked = e.target.checked;
        const itemElement = document.querySelector(`#item${id}`);
        const labelElement = itemElement.querySelector('label');
        Storage.setDone(id, checked);
        if(checked) {
            done.appendChild(itemElement);
            labelElement.classList.add('strikethrough');
        }
        else {
            todo.appendChild(itemElement);
            labelElement.classList.remove('strikethrough');
        }
    }

    static deleteItem(e) {
        const id = parseInt(this.id.slice(4));
        const itemElement = document.querySelector(`#item${id}`);
        if(Storage.deleteItem(id)) itemElement.remove();
    }

    static createToggleAddProject() {
        const toggleDiv = document.createElement('div');
        toggleDiv.id = 'add-project-toggle';
        // toggleDiv.classList.add('hidden');

        const label = document.createElement('label');
        label.htmlFor = 'input-project-name';
        label.textContent = "Project Name";

        const inputTextProjectTitle = document.createElement('input');
        inputTextProjectTitle.id = 'input-project-name';
        inputTextProjectTitle.type = 'text';
        // inputTextProjectTitle.addEventListener('keydown', (e) => {
        //     if(e.key == 'Enter') UI.addProjectByName();
        // });

        const buttonAdd = document.createElement('button');
        buttonAdd.textContent = "Add";
        // buttonAdd.addEventListener('click', UI.addProjectByName);

        // Button to show and hide the #add-item-toggle (input / button)
        const buttonToggle = document.createElement('button');
        buttonToggle.id = "button-toggle-project";
        buttonToggle.classList.add('material-icons');
        buttonToggle.textContent = 'create_new_folder';
        buttonToggle.addEventListener('click', UI.toggleAddProject);

        toggleDiv.append(label);
        toggleDiv.append(inputTextProjectTitle);
        toggleDiv.append(buttonAdd);

        return {toggleDiv, buttonToggle};
    }

    static createToggleGroup() {
        const toggleGroup = document.createElement('div');
        toggleGroup.id = 'add-item';

        const toggleAddItem = UIAddItem.create();
        const toggleAddProject = UI.createToggleAddProject();
        
        toggleGroup.append(toggleAddItem.toggleDiv);
        toggleGroup.append(toggleAddProject.toggleDiv);
        toggleGroup.append(toggleAddProject.buttonToggle);
        toggleGroup.append(toggleAddItem.buttonToggle);

        body.append(toggleGroup);
    }

    static notify(message) {
        UI.createMessage(message);
    }

    static loadList() {
        const list = Storage.load();
        for(const item of list) {
            UI.createItem(item);
        }
    }

}