import { EVENT_ITEM_DONE, EVENT_ITEM_NEW } from './event-types';

const {default: ID} = require('./id');

export default class Item {
    id;
    title;
    dueDate;
    done;
    originDate;

    constructor(title, dueDate, done=false, originDate=new Date()) {
        this.id = ID.getNext();
        this.title = title;
        this.dueDate = dueDate;
        this.done = done;
        this.originDate = originDate;
        PubSub.publish(EVENT_ITEM_NEW, this);
    }

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
}