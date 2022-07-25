

import { EVENT_ITEM_DONE, EVENT_ITEM_UNDONE } from "./event-types";
import HTML from "./html";
import Item from "./item";

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

    static createItems(div, list, done=false) {
        list.getItems(done)
            .forEach(item => 
                div.append(this.createItem(item)));
    }

}