export default class Item {
    name;
    dueDate;
    done;
    originDate;

    constructor(name, dueDate, done=false, originDate=new Date()) {
        this.name = name;
        this.dueDate = dueDate;
        this.done = done;
        this.originDate = originDate;
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
}