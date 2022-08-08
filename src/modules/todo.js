import Container from "./container";
import Project from "./project";

// A collection of "Project" objects
export default class TODO extends Container {
    constructor(projectList) {
        super();

        if(projectList === null) projectList = [];
        console.log("PROJECT CONSTRUCTOR");
        console.dir(projectList);

        for(project in projectList) {
            const addSuccess = this.add(new Project(project));
            // TODO: Error handling
        }
    }
}