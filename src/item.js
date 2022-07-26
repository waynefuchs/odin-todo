import { EVENT_DATA_CHANGED, EVENT_ITEM_DONE, EVENT_ITEM_NEW } from './event-types';

const {default: ID} = require('./id');

export default class Item {
    id;
    title;
    dueDate;
    done;
    originDate;

    setTitle(title) {
        this.title = title;
        PubSub.publish(EVENT_DATA_CHANGED);
    }

    getTitle() {
        return this.title;
    }

    setDueDate(dueDate) {
        this.dueDate = dueDate;
        PubSub.publish(EVENT_DATA_CHANGED);
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
        PubSub.publish(EVENT_DATA_CHANGED);
    }

    constructor(title, dueDate, done=false, originDate=new Date()) {
        this.id = ID.getNext();
        this.title = title;
        this.dueDate = dueDate;
        this.done = done;
        this.originDate = originDate;
        PubSub.publish(EVENT_ITEM_NEW, this);
    }
}