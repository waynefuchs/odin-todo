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

    constructor(jsonItem) {
        // id gets created based on session
        this.id = jsonItem.id ?? -1;
        this.title = jsonItem.title ?? "";
        this.project = jsonItem.project ?? 0;
        this.done = jsonItem.done ?? false;
        this.originDate = jsonItem.originDate ?? Date.now();
        this.dueDate = jsonItem.dueDate ?? false;
    }
}