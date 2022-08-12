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

    getHTMLID() {
        return `item-${this.id}`;
    }

    setDone(done) {
        this.done = done;
    }

    isDone() {
        return this.done;
    }

    toJSON() {
        return {
            id,
            title,
            done,
            originDate,
            dueDate
        };
    }

    // TODO: REMOVE THIS DEBUG METHOD
    static makeJSON(id, title, done, originDate=null, dueDate=null) {
        return JSON.stringify({id, title, done, originDate, dueDate});
    }

    constructor(jsonItem) {
        const item = JSON.parse(jsonItem);

        // id gets created based on session
        this.id = item.id ?? -1;
        this.title = item.title ?? "";
        this.done = item.done ?? false;
        this.originDate = item.originDate ?? Date.now();
        this.dueDate = item.dueDate ?? false;
    }
}