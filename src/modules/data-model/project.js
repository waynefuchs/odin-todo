import Log from "../log";
import Container from "./container";
import Item from "./item";

// A collection of "Item" objects
export default class Project extends Container {
    id;
    name;

    constructor(project=null) {
        Log.debug("Project.constructor()");
        super();
        if (typeof project === 'string' || project instanceof String) throw "project.js: Object data expected";

        // Convert JSON to an object
        if(project === null) project = "{}";

        // Assign class variables
        this.id = project.id ?? 0;            // 'project-0' is equivalent to "NO PROJECT"
        this.name = project.name ?? "TODO";   // 'TODO' is the default project name

        // Add Items
        for(itemData in project.list ?? []) {
            const item = new Item(itemData);
            //TODO: Remove unused success value
            //TODO: Add notification on *why* the add failed
            //      Likely a good use case for pub-sub(?)
            const addSuccess = this.list.add(item);
        }

        // TODO: REMOVE THIS DEBUG ITEM
        // Add an item so i can see something in the list
        if(this.isEmpty()) {
            this.add(new Item(Item.makeObject(77, "hello there", false)));
        }
    }

    setID(id) {
        Log.debug("Project.setID()");
        this.id = id;
    }

    getID() {
        Log.debug("Project.getID()");
        return this.id;
    }

    setName(name) {
        Log.debug("Project.setName()");
        this.name = name;
    }

    getName() {
        Log.debug("Project.getName()");
        return this.name;
    }

    getHTMLID(prefix='project-', hash=false) {
        Log.debug("Project.getHTMLID()");
        return (hash ? '#' : '') + prefix + this.id;
    }

    toJSON() {
        Log.debug("Project.toJSON()");
        return JSON.stringify({
            id: this.id,
            name: this.name,
            list: this.list,
        });
    }
}