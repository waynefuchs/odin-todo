import Container from "./container";
import Project from "./project";
import Item from "./item";

// A collection of "Project" objects
export default class TODO extends Container {
    constructor(data) {
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
        return {
            list: this.list,
        };
    }
}