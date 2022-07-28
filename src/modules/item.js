import { EVENT_DATA_CHANGED, EVENT_ITEM_DONE, EVENT_ITEM_NEW } from './event-types';

const {default: ID} = require('./id');

function notifyDataDirty() {
    PubSub.publish(EVENT_DATA_CHANGED);
}

export default class Item {
    id;
    title;
    dueDate;
    done;
    originDate;

    setTitle(title) {
        this.title = title;
        notifyDataDirty();
    }

    getTitle() {
        return this.title;
    }

    setDueDate(dueDate) {
        this.dueDate = dueDate;
        notifyDataDirty();
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
        notifyDataDirty();
    }

    constructor(jsonItem) {
        // id gets created based on session
        this.id = ID.getNext();
        this.title = jsonItem.title ?? undefined;
        this.done = jsonItem.done ?? undefined;
        this.originDate = jsonItem.originDate ?? undefined;
        this.dueDate = jsonItem.dueDate ?? undefined;

        PubSub.publish(EVENT_ITEM_NEW, this);
        notifyDataDirty();
    }
}