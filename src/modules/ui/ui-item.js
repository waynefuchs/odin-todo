import Item from "../item";// TODO: Remove this if not required

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

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = `${item.getHTMLID()}-checkbox`;
        checkbox.id = checkbox.name;
        div.append(checkbox);

        const label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.textContent = input.getTitle();
        div.append(label);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('material-icons');
        deleteButton.textContent = 'delete';
        deleteButton.addEventListener('click', (event) => {
            console.log(`delete: ${item.getID()}`);
        });
        div.append(deleteButton);
    }
}