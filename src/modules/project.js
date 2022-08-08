import Container from "./container";

// A collection of "Item" objects
export default class Project extends Container {
    id;
    name;

    constructor(projectJSON=null) {
        super();

        if(projectJSON === null) projectJSON = {}
        this.id = projectJSON.id ?? "";
        this.name = projectJSON.name ?? "TODO";

        for(itemData in projectJSON.list ?? []) {
            const item = new Item(itemData);
            const addSuccess = this.list.add(item);
        }
    }

    setID(id) {
        this.id = id;
    }

    getID() {
        return this.id;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    getHTMLID(prefix, hash=false) {
        return (hash ? '#' : '') + prefix + this.id;
    }
}