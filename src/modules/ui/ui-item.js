import Storage from "../storage"
import ProjectHeader from "./project-header";

export default class UIItem {
    static create(item) {
        const div = document.createElement('div');
        div.id = item.getHTMLID();
        div.classList.add('item');
        div.classList.add('draggable');
    
        // Drag and Drop
        div.draggable = true;
        div.addEventListener('dragstart', (event) => {
            div.classList.add('dragging');
            UIItem.dragSetData(event);
        });
        div.addEventListener('dragend', (event) => {
            div.classList.remove('dragging');
        });

        const checkboxID = `${item.getHTMLID()}-checkbox`;
        const label = document.createElement('label');
        label.htmlFor = checkboxID;
        label.textContent = item.getTitle();

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('material-icons');
        deleteButton.classList.add('item-delete');
        deleteButton.textContent = 'delete';
        deleteButton.addEventListener('click', (event) => {
            const projectID = Number(event.target.parentElement.parentElement.id.slice(8));
            const itemID = item.getID();
            Storage.deleteItem(projectID, itemID);
            div.remove();
            ProjectHeader.toggleDeleteProjectButton(projectID);
        });

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = checkboxID;
        checkbox.name = checkboxID;
        checkbox.checked = item.isDone();
        let action = item.isDone() ? 'add' : 'remove';
        div.classList[action]('done');
        label.classList[action]('done');
        deleteButton.classList[action]('done');
        checkbox.addEventListener('change', (event) => {
            item.setDone(checkbox.checked);
            action = item.isDone() ? 'add' : 'remove';
            Storage.save();
            div.classList[action]('done');
            label.classList[action]('done');
            deleteButton.classList[action]('done');
        });

        div.append(checkbox);
        div.append(label);
        div.append(deleteButton);

        return div;
    }

    static dragSetData(event) {
        event.dataTransfer.setData('text/plain', JSON.stringify({
                id: event.target.id,
                startProjectID: event.target.parentElement.id,
            }));
    }
}