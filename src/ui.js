

import { EVENT_DATA_CHANGED, EVENT_ITEM_DONE, EVENT_ITEM_UNDONE } from "./event-types";
import HTML from "./html";
import Item from "./item";
import List from "./list";

// Get a reference to body
const body = document.querySelector('body');

// Create two 'div' elements directly under body
const todo = HTML.div('', 'todo');
const done = HTML.div('', 'done');
body.append(todo);
body.append(done);

export default class UI {
    static createItem(item) {
        const id = item.getID();
        const title = item.getTitle();
        const div = HTML.div('item hello', `item${id}`);

        const forInput = `check${id}`;
        const checkbox = HTML.checkbox(forInput);
        const label1 = HTML.label(title, forInput);
        const label2 = HTML.label(item.getDueDate(), forInput);

        checkbox.addEventListener('change', (e) => {
            console.log("Pushing...");
            PubSub.publish(EVENT_ITEM_DONE, {item:item, done:e.target.checked});
        });

        div.append(checkbox);
        div.append(label1);
        div.append(label2);

        return div;
    }

    static createItems(div, done=false) {
        List.getItems(done)
            .forEach(item => 
                div.append(this.createItem(item)));
    }


    static clear() {
        UI.removeAllChildNodes(todo);
        UI.removeAllChildNodes(done);
    }

    static removeAllChildNodes(parent) {
        while(parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    static redraw() {
        UI.clear();
        UI.createItems(todo, true);
        UI.createItems(done, false);
    }

    constructor() {
        PubSub.subscribe(EVENT_DATA_CHANGED, UI.redraw);
    }
}