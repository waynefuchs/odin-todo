import { EVENT_ITEM_DONE, EVENT_ITEM_UNDONE } from "./event-types";
import HTML from "./html";
import Item from "./item";

function updateDone(event, item, done) {
    const ele = document.querySelector(`#${item.getElementName()}`);
    if(ele === null) throw `Element (${item.getElementName}) not found.`;
    item.setDone(done);

    if(done) ele.classList.add('strikethrough');
    else ele.classList.remove('strikethrough');
}

export default class UI {
    constructor() {
        PubSub.subscribe(EVENT_ITEM_DONE, updateDone);
    }

    static createItem(item) {
        const div = HTML.div("item", item.getName());
        div.classList.add('item');

        const idName = item.getElementName();
        const checkbox = HTML.checkbox(idName);
        const label1 = HTML.label(item.getName(), idName);
        const label2 = HTML.label(item.getDueDate(), idName);

        checkbox.addEventListener('change', (e) => {
            PubSub.publish(EVENT_ITEM_DONE, item, e.target.checked);
        });

        PubSub.subscribe(EVENT_ITEM_DONE, updateDone);

        div.append(checkbox);
        div.append(label1);
        div.append(label2);

        return div;
    }

    static createItems(div, list, done=false) {
        list.getItems(done)
            .forEach(item => 
                div.append(this.createItem(item)));
    }

}