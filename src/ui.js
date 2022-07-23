import HTML from "./html";
import Item from "./item";

export default class UI {
    static createItem(item) {
        const div = HTML.div("item", item.getName());
        div.classList.add('item');

        const checkbox = HTML.checkbox(item.getElementName());
        const label1 = HTML.label(item.getName(), item.getElementName());
        const label2 = HTML.label(item.getDueDate(), item.getElementName());

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