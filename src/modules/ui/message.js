import ID from "../data-model/id";
import Item from "../data-model/item";

let messageList = [];
let id = new ID();

export default class Message {
    static createContainer(parent=document.body) {
        const messageDiv = document.createElement('div');
        messageDiv.id = 'message';
        parent.append(messageDiv);
    }

    static createMessage(text) {
        const containerDiv = document.querySelector('#message');

        const messageDiv = document.createElement('div');
        messageDiv.id = `message${id.next()}`;
        messageDiv.classList.add('message');

        const buttonDelete = document.createElement('button');
        buttonDelete.id = `buttonDelete${messageDiv.id}`
        buttonDelete.classList.add('material-icons');
        buttonDelete.classList.add('warning');
        buttonDelete.textContent = "warning";
        buttonDelete.addEventListener('click', () => messageDiv.remove());

        const message = document.createElement('label');
        message.htmlFor = buttonDelete.id;
        message.textContent = text;

        messageDiv.append(message);
        messageDiv.append(buttonDelete);

        containerDiv.append(messageDiv);
        messageList.push(messageDiv);
    }

    static notify(message) {
        Message.createMessage(message);
    }
}