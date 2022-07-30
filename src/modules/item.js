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
        this.id = jsonItem.id ?? undefined;
        this.title = jsonItem.title ?? undefined;
        this.done = jsonItem.done ?? undefined;
        this.originDate = jsonItem.originDate ?? undefined;
        this.dueDate = jsonItem.dueDate ?? undefined;
    }
}