import Container from "./container";
import Project from "./project";
import Item from "./item";

// A collection of "Project" objects
export default class TODO extends Container {
    constructor(projectList) {
        super();
        if(projectList === null) projectList = [];

        // Iterate the project list and add the loaded items
        for(project in projectList) this.add(new Project(project));

        // Ensure a 'default' TODO exists.
        if(!this.contains('id', 0)) this.add(new Project());
    }
}