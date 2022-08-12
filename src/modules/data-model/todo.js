import Container from "./container";
import Project from "./project";
import Item from "./item";
import Log from "../log";

// A collection of "Project" objects
export default class TODO extends Container {
    constructor(data) {
        Log.debug("TODO.constructor()");
        super();
        if (typeof data === 'string' || data instanceof String) throw "todo.js: Object data expected";
        if(data === null) data = [];

        // Iterate the project list and add the loaded items
        for(const key in data.list) {
            this.add(new Project(data.list[key]));
        }

        // Ensure a 'default' TODO exists.
        if(!this.contains('id', 0)) this.add(new Project());
    }

    toJSON() {
        Log.debug("TODO.toJSON()");
        return {
            list: this.list,
        };
    }
}