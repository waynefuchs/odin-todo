import { EVENT_ITEM_DONE, EVENT_ITEM_NEW } from './event-types';

const {default: ID} = require('./id');

const itemDoneStatus = function(item, status) {
    item.setDone(status);
}

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
        PubSub.subscribe(EVENT_ITEM_DONE, )
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

    isDone() {
        return this.done;
    }

    setDone(done) {
        this.done = done;
    }
}