import Container from "./container";
import Item from "./item";

// A collection of "Item" objects
export default class Project extends Container {
    id;
    name;

    constructor(projectJSON=null) {
        super();

        if(projectJSON === null) projectJSON = {}
        this.id = projectJSON.id ?? 0; // 'project-0' is equivalent to "NO PROJECT"
        this.name = projectJSON.name ?? "TODO";

        for(itemData in projectJSON.list ?? []) {
            const item = new Item(itemData);
            //TODO: Remove unused success value
            //TODO: Add notification on *why* the add failed
            //      Likely a good use case for pub-sub
            const addSuccess = this.list.add(item);
        }

        if(this.isEmpty()) {
            this.add(new Item(Item.makeJSON(77, "hello there", false)));
            console.log("FUCK FUCK FUCK YEAH");
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
        console.log((hash ? '#' : '') + prefix + this.id);
        return (hash ? '#' : '') + prefix + this.id;
    }
}