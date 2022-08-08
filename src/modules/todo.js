import Container from "./container";
import Project from "./project";

// A collection of "Project" objects
export default class TODO extends Container {
    constructor(todoList) {
        super();

        if(todoList === null) todoList = [];
        console.log("TODO CONSTRUCTOR");
        console.dir(todoList);

        for(project in todoList) {
            this.add(new Project(project));
        }
    }
}