import Container from "./container";
import Project from "./project";

export default class ProjectList extends Container {
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