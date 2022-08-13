import Log from "../log";

export default class Item {
    id;
    title;
    done;
    originDate;
    dueDate;

    setTitle(title) {
        Log.debug("Item.setTitle()");
        this.title = title;
    }

    getTitle() {
        Log.debug("Item.getTitle()");
        return this.title;
    }

    setDueDate(dueDate) {
        Log.debug("Item.setDueDate()");
        this.dueDate = dueDate;
    }

    getDueDate() {
        Log.debug("Item.getDueDate()");
        return this.dueDate;
    }

    getOriginDate() {
        Log.debug("Item.getOriginDate()");
        return this.originDate;
    }

    getID() {
        Log.debug("Item.getID()");
        return this.id;
    }

    getHTMLID(prefix='item-', hash=false) {
        Log.debug("Item.getHTMLID()");
        return (hash ? '#' : '') + prefix + this.id;
    }

    setDone(done) {
        Log.debug("Item.setDone()");
        this.done = done;
    }

    isDone() {
        Log.debug("Item.isDone()");
        return this.done;
    }

    toJSON() {
        Log.debug("Item.toJSON()");
        return {
            id: this.id,
            title: this.title,
            done: this.done,
            originDate: this.originDate,
            dueDate: this.dueDate
        };
    }

    toString() {
        return `ITEM:
    ${this.id}
    ${this.title}
    ${this.done}
    ${this.originDate}
    ${this.dueDate}`;
    }

    constructor(item) {
        Log.debug("Item.constructor()");

        console.log("MAKE IT");
        console.dir(item);

        // id gets created based on session
        this.id = item.id ?? -1;
        this.title = item.title ?? "";
        this.done = item.done ?? false;
        this.originDate = item.originDate ?? Date.now();
        this.dueDate = item.dueDate ?? false;

        console.log(this.toString());
    }

    static makeObject(id, title, done, originDate=null, dueDate=null) {
        Log.debug("Item.makeObject()");
        return {id, title, done, originDate, dueDate};
    }    
}