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

    isDone() {
        return this.done;
    }

    setDone(done) {
        this.done = done;
    }

    constructor(jsonItem) {
        // id gets created based on session
        this.id = jsonItem.id ?? -1;
        this.title = jsonItem.title ?? "";
        this.done = jsonItem.done ?? false;
        this.originDate = jsonItem.originDate ?? Date.now();
        this.dueDate = jsonItem.dueDate ?? false;
    }
}