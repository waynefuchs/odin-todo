import Storage from '../storage';
import UI from '../ui';

const body = document.querySelector("body");
let isAddTodoVisible = false;
let toggleElement = undefined;

export default class UIAddItem {
    static create() {
        toggleElement = document.createElement('div');
        toggleElement.id = 'add-item-toggle';
        toggleElement.classList.add('hidden');
    
        const label = document.createElement('label');
        label.htmlFor = 'input-item-title';
        label.textContent = "Item Title";
    
        const inputTextItemTitle = document.createElement('input');
        inputTextItemTitle.id = 'input-item-title';
        inputTextItemTitle.type = 'text';
        inputTextItemTitle.addEventListener('keydown', (e) => {
            if(e.key == 'Enter') UIAddItem.addItem();
        });
    
        const buttonAdd = document.createElement('button');
        buttonAdd.textContent = "Add";
        buttonAdd.addEventListener('click', UIAddItem.addItem);
    
        // Button to show and hide the #add-item-toggle (input / button)
        const buttonToggle = document.createElement('button');
        buttonToggle.id = "button-toggle-item";
        buttonToggle.classList.add('material-icons');
        buttonToggle.textContent = 'add_circle_outline';
        buttonToggle.addEventListener('click', UIAddItem.toggle);
    
        toggleElement.append(label);
        toggleElement.append(inputTextItemTitle);
        toggleElement.append(buttonAdd);
    
        return {toggleDiv: toggleElement, buttonToggle};
    }

    static toggle() {
        const button = document.querySelector('#button-toggle-item');
        button.classList.toggle('cancel');
        const addItem = body.querySelector('#add-item-toggle');

        if(isAddTodoVisible) 
            UIAddItem.setHidden(addItem);
        else 
            UIAddItem.setVisible(addItem);
    }

    static setVisible(element) {
        isAddTodoVisible = true;
        element.classList.remove('hidden');
        element.querySelector('#input-item-title').focus();
        body.querySelector('#button-toggle-item').textContent = 'highlight_off';
    }
    
    static setHidden(element) {
        isAddTodoVisible = false;
        element.classList.add('hidden');
        body.querySelector('#button-toggle-item').textContent = 'add_circle_outline';
    }
    
    static addItem(e) {
        const inputTextItemTitle = document.querySelector('#input-item-title');
        const title = inputTextItemTitle.value;
        const item = Storage.addItemByTitle(title);
        UIAddItem.clearInput();
        if(!item) {
            UI.notify(`Adding ${title} failed.`);
            return;
        }
        UI.createItem(item);
    };

    static clearInput() {
        const inputTextItemTitle = document.querySelector('#input-item-title');
        inputTextItemTitle.value = "";
    }

    static isVisible() {
        return !toggleElement.classList.contains('hidden');
    }
}

