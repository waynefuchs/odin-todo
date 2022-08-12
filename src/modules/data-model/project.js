import Container from "./container";
import Item from "./item";

// A collection of "Item" objects
export default class Project extends Container {
    id;
    name;

    constructor(projectJSON=null) {
        super();

        if(projectJSON === null) projectJSON = "{}";
        const projectObject = JSON.parse(projectJSON);

        this.id = projectObject.id ?? 0;            // 'project-0' is equivalent to "NO PROJECT"
        this.name = projectObject.name ?? "TODO";   // 'TODO' is the default project name

        for(itemData in projectObject.list ?? []) {
            const item = new Item(itemData);
            //TODO: Remove unused success value
            //TODO: Add notification on *why* the add failed
            //      Likely a good use case for pub-sub
            const addSuccess = this.list.add(item);
        }

        // TODO: REMOVE THIS DEBUG ITEM
        if(this.isEmpty()) {
            this.add(new Item(Item.makeJSON(77, "hello there", false)));
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

    getHTMLID(prefix='project-', hash=false) {
        return (hash ? '#' : '') + prefix + this.id;
    }
}