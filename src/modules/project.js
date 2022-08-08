import Container from "./container";

// A collection of "Item" objects
export default class Project extends Container {
    id;
    name;

    constructor(project) {
        super();

        if(project === null) project = [];
        console.log("PROJECT CONSTRUCTOR");
        console.dir(project);

        for(item in project) {
            const addSuccess = container.list.add(project);
        }

        // if(id === null || id === undefined) return null;
        // if(name === null || name === undefined) return null;
        // project.id = id;
        // project.name = name;
        // project.list = list || new Container();

        return container;
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