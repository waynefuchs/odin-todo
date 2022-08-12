import Item from "../data-model/item";

export default class UIItem {
    // id;
    // title;
    // done;
    // originDate;
    // dueDate;
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
        deleteButton.textContent = 'delete';
        deleteButton.addEventListener('click', (event) => {
            const projectID = event.target.parentElement.parentElement.id;
            const itemID = item.getID();
            UIItem.dbDeleteItem(projectID, itemID);
            div.remove();
        });

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = checkboxID;
        checkbox.name = checkboxID;
        checkbox.addEventListener('change', (event) => {
            const f = checkbox.checked ? 'add' : 'remove';
            div.classList[f]('done');
            label.classList[f]('done');
            deleteButton.classList[f]('done');
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


    static dbDeleteItem(projectID, itemID) {
        console.log(`delete: ${projectID}:${itemID}`);
    }
}