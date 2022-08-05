import Container from "./container";

export default class Projects {
    constructor(projectList) {
        const container = new Container();

        if(projectList === null) projectList = [];
        console.log("PROJECT CONSTRUCTOR");
        console.dir(projectList);

        for(project in projectList) {
            const addSuccess = container.list.add(project);
        }

        // if(id === null || id === undefined) return null;
        // if(name === null || name === undefined) return null;
        // project.id = id;
        // project.name = name;
        // project.list = list || new Container();

        return container;
    }
}