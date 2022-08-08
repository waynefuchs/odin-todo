import Storage from './storage';
import UIAddItem from './ui/add-item';
import UIAddProject from './ui/add-project';
import Message from './ui/message';
import ProjectHeader from './ui/project-header';
// import Item from './item';

const body = document.querySelector("body");

export default class UI {
    static loadSite() {
        Message.createContainer();
        ProjectHeader.create();

        // UI.createHeading('h1', 'todo');

        // UI.createToggleGroup();

        // UI.createContainerTodo();
        // UI.createContainerDone();

        UI.load();
        // document.addEventListener('keydown', UI.listenForKeyboardEvents);
    }

    static load() {
        const projects = Storage.load();
        // for(const item of list) {
        //     UI.createItem(item);
        // }
    }


    static listenForKeyboardEvents(e) {
        if(e.key === "Escape") 
            UI.handleEscapeKeyPress();
        else if(e.key === 'n' && !UIAddItem.isVisible()) {
            e.preventDefault();
            UIAddItem.toggle();
        }
    }

    static handleEscapeKeyPress() {
        if(messageList.length > 0) 
            UI.deleteMessage.bind(messageList[0])();

        else if(UIAddItem.isVisible()) 
            UIAddItem.toggle();
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

    static createToggleGroup() {
        const toggleGroup = document.createElement('div');
        toggleGroup.id = 'add-item';

        const toggleAddItem = UIAddItem.create();
        const toggleAddProject = UIAddProject.create();
        
        toggleGroup.append(toggleAddItem.toggleDiv);
        toggleGroup.append(toggleAddProject.toggleDiv);
        toggleGroup.append(toggleAddProject.buttonToggle);
        toggleGroup.append(toggleAddItem.buttonToggle);

        body.append(toggleGroup);
    }
}