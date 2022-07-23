import { EVENT_ITEM_NEW } from './event-types';

const {default: ID} = require('./id');

export default class Item {
    id;
    name;
    dueDate;
    done;
    originDate;

    constructor(name, dueDate, done=false, originDate=new Date()) {
        this.id = ID.getNext();
        this.name = name;
        this.dueDate = dueDate;
        this.done = done;
        this.originDate = originDate;
        PubSub.publish(EVENT_ITEM_NEW, this);
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
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

    getElementName() {
        return `item${this.id}`;
    }
}