export default class Item {
    id;
    title;
    done;
    originDate;
    dueDate;

    setTitle(title) {
        this.title = title;
    }

    getTitle() {
        return this.title;
    }

    setDueDate(dueDate) {
        this.dueDate = dueDate;
    }

    getDueDate() {
        return this.dueDate;
    }

    getOriginDate() {
        return this.originDate;
    }

    getID() {
        return this.id;
    }

    getHTMLID(prefix='item-', hash=false) {
        return (hash ? '#' : '') + prefix + this.id;
    }

    setDone(done) {
        this.done = done;
    }

    isDone() {
        return this.done;
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            done: this.done,
            originDate: this.originDate,
            dueDate: this.dueDate
        };
    }

    constructor(item) {
        this.id = item.id ?? -1;
        this.title = item.title ?? "";
        this.done = item.done ?? false;
        this.originDate = item.originDate ?? Date.now();
        this.dueDate = item.dueDate ?? false;
    }

    static makeObject(id, title, done, originDate=null, dueDate=null) {
        Log.debug("Item.makeObject()");
        return {id, title, done, originDate, dueDate};
    }    
}